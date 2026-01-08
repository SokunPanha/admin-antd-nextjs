import { RoleListRequest, SystemSettingRolesListApiV1 } from "@/core/services/api";

export default function useFetchRoles() {
  const request = async (params: RoleListRequest) => {
    const response = await SystemSettingRolesListApiV1({
     ...params
    });

    return {
      data: response.items || [],
      total: response.total || 0,
      success: true
    };
  };

  return { request };
}
