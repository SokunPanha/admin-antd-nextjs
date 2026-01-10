import { useEffect, useState, createElement } from 'react';
import { App } from 'antd';
import { AuthMenusApiV1, MenuItemData } from '@/core/services/api';
import { ErrorHandler } from '@/core/services/error-handler';
import * as Icons from '@ant-design/icons';

export interface TransformedMenuItem {
  path: string;
  name: string;
  icon?: React.ReactNode;
  children?: TransformedMenuItem[];
}

export interface MenuRouteData {
  path: string;
  routes: TransformedMenuItem[];
}

export function useMenuData() {
  const { message: messageApi, notification: notificationApi } = App.useApp();
  const [menuData, setMenuData] = useState<MenuRouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);

        const response = await AuthMenusApiV1();

        if (!response) {
          throw new Error('No response from API');
        }

        // Handle different response structures
        let menuItems: MenuItemData[] = [];

        // Check if response.menus exists (expected structure)
        if (response.menus && Array.isArray(response.menus)) {
          menuItems = response.menus;
        }
        // Check if response itself is an array
        else if (Array.isArray(response)) {
          menuItems = response as any;
        }
        // Check if there's a data property
        else if ((response as any).data && Array.isArray((response as any).data)) {
          menuItems = (response as any).data;
        }
        else {
          console.warn('⚠️ API response structure not recognized');
          console.warn('⚠️ Available properties:', Object.keys(response));
          throw new Error('Invalid menu data structure - no menus array found');
        }

        if (menuItems.length === 0) {
          console.warn('⚠️ No menu items found in response');
        }

        // Transform API response to ProLayout format
        const transformedData: MenuRouteData = {
          path: '/admin',
          routes: transformMenuItems(menuItems)
        };

        setMenuData(transformedData);
        setError(null);
      } catch (err: any) {
        console.error('❌ Error fetching menus:', err);
        console.error('❌ Error message:', err?.message);
        console.error('❌ Error status:', err?.status);
        console.error('❌ Error stack:', err?.stack);

        // Use ErrorHandler to handle the error (will redirect if auth error)
        const errorHandler = new ErrorHandler(messageApi, notificationApi);
        errorHandler.handle(err, {
          showNotification: true,
          showMessage: false,
        });

        setError(err?.message || 'Failed to load menu data');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [messageApi, notificationApi]);

  return { menuData, loading, error };
}

// Map icon string names to actual icon components
function getIconComponent(iconName?: string): React.ReactNode {
  if (!iconName) return undefined;

  // @ts-ignore - dynamically access icon from Icons object
  const IconComponent = Icons[iconName as keyof typeof Icons];

  if (IconComponent && typeof IconComponent === 'function') {
    return createElement(IconComponent as any);
  }

  console.warn(`Icon "${iconName}" not found in @ant-design/icons`);
  return undefined;
}

// Transform API menu items to ProLayout format
function transformMenuItems(items: MenuItemData[]): TransformedMenuItem[] {
  return items.map(item => {
    const transformed: TransformedMenuItem = {
      path: (item.route_path as any) || `/admin/${item.code}`,
      name: extractLabel(item.labels),
      icon: getIconComponent(item.icon as string),
    };

    // Recursively transform children if they exist
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      transformed.children = transformMenuItems(item.children as MenuItemData[]);
    }

    return transformed;
  });
}

// Extract label from multi-language object
function extractLabel(labels: any): string {
  if (!labels || typeof labels !== 'object') {
    return 'Unknown';
  }

  // Try to get English label first, then fallback to other languages
  return labels.en || labels.zh || labels.km || Object.values(labels)[0] || 'Unknown';
}
