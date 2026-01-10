import { MenuListRequest, SystemSettingMenusListApiV1 } from "@/core/services/api";

export default function useFetchMenus() {
  const request = async (params: MenuListRequest) => {
    console.log("🚀 ~ request ~ params:", params)
    const response = await SystemSettingMenusListApiV1({
     ...params
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
        // Root level item
        rootItems.push(node);
      } else {
        // Child item - add to parent's children array
        const parent = itemsMap.get(String(item.parent_id));
        if (parent) {
          parent.children.push(node);
        } else {
          // If parent not found, treat as root
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

    return {
      data: rootItems,
      total: response.total || 0,
      success: true
    };
  };

  return { request };
}
