import { useEffect, useState } from 'react';
import { AuthMenusApiV1, MenuItemData } from '@/core/services/api';

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
  const [menuData, setMenuData] = useState<MenuRouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        console.log('🔄 Starting to fetch menus from API...');
        setLoading(true);

        const response = await AuthMenusApiV1();

        console.log('📦 Raw API Response:', response);
        console.log('📦 Response Type:', typeof response);
        console.log('📦 Response is Array?:', Array.isArray(response));
        console.log('📦 Response Keys:', response ? Object.keys(response) : 'null');
        console.log('📦 Response stringified:', JSON.stringify(response, null, 2));

        if (!response) {
          throw new Error('No response from API');
        }

        // Handle different response structures
        let menuItems: MenuItemData[] = [];

        // Check if response.menus exists (expected structure)
        if (response.menus && Array.isArray(response.menus)) {
          console.log('✓ Found menus in response.menus');
          menuItems = response.menus;
        }
        // Check if response itself is an array
        else if (Array.isArray(response)) {
          console.log('✓ Response is directly an array of menus');
          menuItems = response as any;
        }
        // Check if there's a data property
        else if ((response as any).data && Array.isArray((response as any).data)) {
          console.log('✓ Found menus in response.data');
          menuItems = (response as any).data;
        }
        else {
          console.warn('⚠️ API response structure not recognized');
          console.warn('⚠️ Available properties:', Object.keys(response));
          throw new Error('Invalid menu data structure - no menus array found');
        }

        console.log('📋 Menu Items to transform:', menuItems);
        console.log('📋 Number of items:', menuItems.length);

        if (menuItems.length === 0) {
          console.warn('⚠️ No menu items found in response');
        }

        // Transform API response to ProLayout format
        const transformedData: MenuRouteData = {
          path: '/admin',
          routes: transformMenuItems(menuItems)
        };

        console.log('✅ Transformed Menu Data:', transformedData);
        console.log('✅ Number of routes:', transformedData.routes.length);

        setMenuData(transformedData);
        setError(null);
      } catch (err: any) {
        console.error('❌ Error fetching menus:', err);
        console.error('❌ Error message:', err?.message);
        console.error('❌ Error stack:', err?.stack);
        setError(err?.message || 'Failed to load menu data');
      } finally {
        setLoading(false);
        console.log('🏁 Menu fetch complete');
      }
    };

    fetchMenus();
  }, []);

  return { menuData, loading, error };
}

// Transform API menu items to ProLayout format
function transformMenuItems(items: MenuItemData[]): TransformedMenuItem[] {
  return items.map(item => {
    const transformed: TransformedMenuItem = {
      path: (item.route_path as any) || `/admin/${item.code}`,
      name: extractLabel(item.labels),
      // Note: We'll handle icons separately since they need to be React components
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
