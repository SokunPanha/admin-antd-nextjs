import { MenuListRequest, SystemSettingMenusListApiV1 } from "@/core/services/api";

export default function useFetchMenus() {
  const request = async (params: MenuListRequest) => {
    const response = await SystemSettingMenusListApiV1({
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
