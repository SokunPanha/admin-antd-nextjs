import { useEffect, useState, createElement } from 'react';
import { App } from 'antd';
import { AuthMenusApiV1, MenuItemData } from '@/core/services/api';
import { ErrorHandler } from '@/core/services/error-handler';
import * as Icons from '@ant-design/icons';
import { useLocale } from '@/contexts/LocaleContext';

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
  const [rawMenuItems, setRawMenuItems] = useState<MenuItemData[] | null>(null);
  const [menuData, setMenuData] = useState<MenuRouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();

  // Fetch menu data from API (only once)
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

        // Store raw menu items
        setRawMenuItems(menuItems);
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

  // Transform menu data when locale changes
  useEffect(() => {
    if (rawMenuItems) {
      const transformedData: MenuRouteData = {
        path: '/admin',
        routes: transformMenuItems(rawMenuItems, locale)
      };
      setMenuData(transformedData);
    }
  }, [rawMenuItems, locale]);

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
function transformMenuItems(items: MenuItemData[], locale: string): TransformedMenuItem[] {
  return items.map(item => {
    const transformed: TransformedMenuItem = {
      path: (item.route_path as any) || `/admin/${item.code}`,
      name: extractLabel(item.labels, locale),
      icon: getIconComponent(item.icon as string),
    };

    // Recursively transform children if they exist
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      transformed.children = transformMenuItems(item.children as MenuItemData[], locale);
    }

    return transformed;
  });
}

// Extract label from multi-language object
function extractLabel(labels: any, locale: string): string {
  if (!labels || typeof labels !== 'object') {
    return 'Unknown';
  }

  // Return the label for the current locale, fallback to 'en' or first available
  return labels[locale] || labels['en'] || labels[Object.keys(labels)[0]] || 'Unknown';
}
