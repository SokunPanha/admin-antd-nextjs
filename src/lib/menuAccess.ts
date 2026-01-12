/**
 * Menu Access Control Utilities
 *
 * These utilities help enforce menu-based access control on the frontend,
 * ensuring users cannot access routes they don't have permission for.
 */

export interface MenuItemData {
  id: number;
  parent_id: number | null;
  labels: Record<string, string>;
  icon: string | null;
  route_path: string | null;
  sort_order: number;
  children?: MenuItemData[];
}

/**
 * Check if user has access to a specific route based on menu data
 *
 * @param route - The route path to check (e.g., '/admin/users')
 * @param menuItems - Array of menu items from API
 * @returns true if user has access, false otherwise
 */
export function hasMenuAccess(
  route: string,
  menuItems: MenuItemData[],
): boolean {
  if (!menuItems || menuItems.length === 0) {
    return false;
  }

  for (const item of menuItems) {
    // Check direct match
    if (item.route_path === route) {
      return true;
    }

    // Check if route starts with menu path (for sub-routes)
    if (item.route_path && route.startsWith(item.route_path)) {
      return true;
    }

    // Check children recursively
    if (item.children && item.children.length > 0) {
      if (hasMenuAccess(route, item.children)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Get all accessible route paths from menu items (flattened)
 *
 * @param menuItems - Array of menu items from API
 * @returns Array of route paths user has access to
 */
export function getAccessibleRoutes(menuItems: MenuItemData[]): string[] {
  const routes: string[] = [];

  function collectRoutes(items: MenuItemData[]) {
    for (const item of items) {
      if (item.route_path) {
        routes.push(item.route_path);
      }
      if (item.children && item.children.length > 0) {
        collectRoutes(item.children);
      }
    }
  }

  collectRoutes(menuItems);
  return routes;
}

/**
 * Find menu item by route path
 *
 * @param route - The route path to search for
 * @param menuItems - Array of menu items from API
 * @returns The menu item if found, null otherwise
 */
export function findMenuByRoute(
  route: string,
  menuItems: MenuItemData[],
): MenuItemData | null {
  for (const item of menuItems) {
    if (item.route_path === route) {
      return item;
    }

    if (item.children && item.children.length > 0) {
      const found = findMenuByRoute(route, item.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * System routes that don't require menu access control
 * These are always accessible to authenticated users
 */
export const SYSTEM_ROUTES = [
  '/admin', // Dashboard/home
  '/admin/profile', // User profile
  '/admin/settings', // User settings
  '/service-unavailable', // Error page
  '/admin/no-access', // Access denied page
];

/**
 * Check if a route is a system route
 */
export function isSystemRoute(route: string): boolean {
  return SYSTEM_ROUTES.some((systemRoute) => route === systemRoute || route.startsWith(`${systemRoute}/`));
}
