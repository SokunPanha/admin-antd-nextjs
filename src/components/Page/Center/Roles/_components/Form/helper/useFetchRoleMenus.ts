import { MenuListRequest, SystemSettingMenusListApiV1, SystemSettingRolesRoleBindMenuListApiV1 } from "@/core/services/api";
import { useState, useCallback } from "react";

export default function useFetchRoleMenus() {
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const request = async (params: MenuListRequest & { role_id?: number }) => {
    setLoading(true);
    try {
      const response = await SystemSettingMenusListApiV1({
        ...params,
        status: 'active'
      });

      const items = response.items || [];

      // Transform flat array to tree structure
      const itemsMap = new Map();
      const rootItems: any[] = [];

      // First pass: create a map of all items
      items.forEach((item: any) => {
        itemsMap.set(String(item.id), { ...item, children: [] });
      });

      // Second pass: build the tree structure
      items.forEach((item: any) => {
        const node = itemsMap.get(String(item.id));
        if (item.parent_id === null || item.parent_id === 0 || item.parent_id === "0") {
          rootItems.push(node);
        } else {
          const parent = itemsMap.get(String(item.parent_id));
          if (parent) {
            parent.children.push(node);
          } else {
            rootItems.push(node);
          }
        }
      });

      // Remove empty children arrays
      const cleanChildren = (items: any[]) => {
        items.forEach((item: any) => {
          if (item.children && item.children.length === 0) {
            delete item.children;
          } else if (item.children && item.children.length > 0) {
            cleanChildren(item.children);
          }
        });
      };

      cleanChildren(rootItems);

      // Fetch selected menus if role_id is provided
      if (params.role_id) {
        const roleMenus = await SystemSettingRolesRoleBindMenuListApiV1({
          role_id: params.role_id
        });

        // Set initial selected menus (these should already include parents from API)
        setSelectedMenuIds(roleMenus.menu_ids || []);
      }

      setLoading(false);
      return {
        data: rootItems,
        total: response.total || 0,
        success: true
      };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Get all children IDs recursively
  const getAllChildrenIds = (item: any): number[] => {
    if (!item.children?.length) return [];
    const ids: number[] = [];
    item.children.forEach((child: any) => {
      ids.push(Number(child.id));
      ids.push(...getAllChildrenIds(child));
    });
    return ids;
  };

  // Handle selection change with custom logic
  const handleSelectionChange = useCallback((
    selectedRowKeys: React.Key[],
    itemsMap: Map<string, any>,
    prevSelectedIds: number[]
  ) => {
    const newKeys = selectedRowKeys.map(k => Number(k));
    const prevKeys = prevSelectedIds.map(k => Number(k));

    const prevSet = new Set(prevKeys);
    const newSet = new Set(newKeys);

    // Find what changed
    const added = newKeys.filter(k => !prevSet.has(k))[0]; // Only one item changes at a time
    const removed = prevKeys.filter(k => !newSet.has(k))[0];

    let result = new Set<number>(prevKeys);

    if (added) {
      const item = itemsMap.get(String(added));
      if (item) {
        result.add(added);

        // If parent selected, select all children
        if (item.children?.length) {
          getAllChildrenIds(item).forEach(id => result.add(id));
        }

        // If child selected, select all parents up the chain
        let currentParentId = item.parent_id;
        while (currentParentId && currentParentId !== 0) {
          result.add(Number(currentParentId));
          const parent = itemsMap.get(String(currentParentId));
          currentParentId = parent?.parent_id;
        }
      }
    }

    if (removed) {
      const item = itemsMap.get(String(removed));
      if (item) {
        result.delete(removed);

        // If parent removed, remove all children
        if (item.children?.length) {
          getAllChildrenIds(item).forEach(id => result.delete(id));
        }

        // If child removed, check if parents should be removed (up the chain)
        let currentParentId = item.parent_id;
        while (currentParentId && currentParentId !== 0) {
          const parent = itemsMap.get(String(currentParentId));
          if (parent?.children) {
            // Check if any child of this parent is still selected
            const hasSelectedChild = parent.children.some((c: any) => result.has(Number(c.id)));
            if (!hasSelectedChild) {
              // No children selected, remove this parent
              result.delete(Number(currentParentId));
              // Continue checking up the chain
              currentParentId = parent.parent_id;
            } else {
              // At least one child is selected, keep this parent and stop checking
              break;
            }
          } else {
            break;
          }
        }
      }
    }

    setSelectedMenuIds(Array.from(result));
  }, []);

  // Get final menu IDs (exclude parents that have no selected children)
  const getFinalMenuIds = useCallback((itemsMap: Map<string, any>): number[] => {
    const result: number[] = [];

    selectedMenuIds.forEach((menuId) => {
      const item = itemsMap.get(String(menuId));
      if (item) {
        // Include this menu
        result.push(menuId);
      }
    });

    return result;
  }, [selectedMenuIds]);

  return {
    request,
    selectedMenuIds,
    setSelectedMenuIds,
    handleSelectionChange,
    getFinalMenuIds,
    loading
  };
}
