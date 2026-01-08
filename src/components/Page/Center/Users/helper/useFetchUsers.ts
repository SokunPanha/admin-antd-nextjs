import { CenterUserListRequest, SystemSettingCenterUsersListApiV1 } from "@/core/services/api";

export default function useFetchUsers() {
  const request = async (params: CenterUserListRequest) => {
    const response = await SystemSettingCenterUsersListApiV1({
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
