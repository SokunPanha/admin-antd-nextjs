import { SystemSettingRolesListApiV1, SystemSettingCenterUsersUserBindRoleListApiV1 } from "@/core/services/api";
import { useState, useCallback } from "react";

export default function useFetchUserRoles() {
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const request = async (params: { user_id?: number }) => {
    setLoading(true);
    try {
      // Fetch all available roles
      const response = await SystemSettingRolesListApiV1({
        page: 1,
        page_size: 1000,
        status: 'active',
        sort: { field: 'id', direction: 'asc' },
        id: 0,
        name: '',
        code: '',
        menu_ids: [],
        created_at_from: '',
        created_at_to: ''
      } as any);

      const items = response.items || [];

      // Fetch user's current roles if user_id is provided
      if (params.user_id) {
        const userRoles = await SystemSettingCenterUsersUserBindRoleListApiV1({
          user_id: params.user_id
        });
        setSelectedRoleIds(userRoles.role_ids || []);
      } else {
        setSelectedRoleIds([]);
      }

      setLoading(false);
      return {
        data: items,
        total: response.total || 0,
        success: true
      };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleSelectionChange = useCallback((selectedRowKeys: React.Key[]) => {
    setSelectedRoleIds(selectedRowKeys.map(k => Number(k)));
  }, []);

  return {
    request,
    selectedRoleIds,
    setSelectedRoleIds,
    handleSelectionChange,
    loading
  };
}
