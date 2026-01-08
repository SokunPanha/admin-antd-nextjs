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

        // Apply parent auto-selection logic
        const selectedIds = applyParentSelection(roleMenus.menu_ids || [], itemsMap);
        setSelectedMenuIds(selectedIds);
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

  // Helper function to apply parent auto-selection
  const applyParentSelection = (menuIds: number[], itemsMap: Map<string, any>): number[] => {
    const selectedSet = new Set(menuIds);

    // For each selected menu, ensure parent is also selected
    menuIds.forEach((menuId) => {
      const item = itemsMap.get(String(menuId));
      if (item && item.parent_id && item.parent_id !== 0) {
        selectedSet.add(item.parent_id);
      }
    });

    return Array.from(selectedSet);
  };

  // Handle selection change with parent auto-selection logic
  const handleSelectionChange = useCallback((selectedRowKeys: React.Key[], itemsMap: Map<string, any>) => {
    const selectedIds = selectedRowKeys.map(key => Number(key));
    const finalSelection = applyParentSelection(selectedIds, itemsMap);
    setSelectedMenuIds(finalSelection);
    return finalSelection;
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
