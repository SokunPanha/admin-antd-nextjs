import { App } from 'antd';
import { SystemSettingCenterUsersCreateApiV1, SystemSettingCenterUsersUpdateApiV1, SystemSettingCenterUsersDeleteApiV1, SystemSettingCenterUsersUpdateStatusApiV1, SystemSettingCenterUsersAssignRolesApiV1, CenterUserCreateRequest, CenterUserUpdateRequest, CenterUserDeleteRequest, CenterUserUpdateStatusRequest, CenterUserAssignRolesRequest } from '@/core/services/api';
import { useTranslations } from 'next-intl';
import { useUsersPageContext } from './hooks';
import { filterRequestParam } from '@/core/libs/base';
import { useCallback } from 'react';

export default function useUser() {
    const { message, modal } = App.useApp();
    const t = useTranslations();
    const context = useUsersPageContext();

    const createUser = useCallback(async (params: CenterUserCreateRequest) => {
        try {
            await SystemSettingCenterUsersCreateApiV1(filterRequestParam(params));
            message.success(t('message.createSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.createFailed'));
        }
    }, [message, t, context.table]);

    const updateUser = useCallback(async (params: CenterUserUpdateRequest) => {
        try {
            await SystemSettingCenterUsersUpdateApiV1(filterRequestParam(params));
            message.success(t('message.updateSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.updateFailed'));
        }
    }, [message, t, context.table]);

    const deleteUser = useCallback(async (params: CenterUserDeleteRequest) => {
        modal.confirm({
            title: t('modal.confirmDelete'),
            content: t('modal.confirmDeleteUser'),
            onOk: async () => {
                try {
                    await SystemSettingCenterUsersDeleteApiV1(filterRequestParam(params));
                    message.success(t('message.deleteSuccess'));
                    context.table.reload();
                } catch (error) {
                    message.error(t('message.deleteFailed'));
                }
            }
        });
    }, [modal, t, message, context.table]);

    const updateUserStatus = useCallback(async (params: CenterUserUpdateStatusRequest) => {
        modal.confirm({
            title: t('modal.confirmStatusChange'),
            content: params.status === 'active'
                ? t('modal.confirmEnableUser')
                : t('modal.confirmDisableUser'),
            onOk: async () => {
                try {
                    await SystemSettingCenterUsersUpdateStatusApiV1(filterRequestParam(params));
                    message.success(t('message.statusUpdated'));
                    context.table.reload();
                    return true;
                } catch (error) {
                    message.error(t('message.updateFailed'));
                    return false;
                }
            },
            onCancel: () => {
                context.table.reload();
            }
        });
    }, [modal, t, message, context.table]);

    const assignRoles = useCallback(async (params: CenterUserAssignRolesRequest) => {
        try {
            await SystemSettingCenterUsersAssignRolesApiV1(filterRequestParam(params));
            message.success(t('message.rolesAssignedSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.rolesAssignedFailed'));
        }
    }, [message, t, context.table]);

    return {
        createUser,
        updateUser,
        deleteUser,
        updateUserStatus,
        assignRoles,
    };
}
