import { App } from 'antd';
import { SystemSettingRolesCreateApiV1, SystemSettingRolesUpdateApiV1, SystemSettingRolesDeleteApiV1, SystemSettingRolesUpdateStatusApiV1, SystemSettingRolesAssignMenusApiV1, RoleCreateRequest, RoleUpdateRequest, RoleDeleteRequest, RoleUpdateStatusRequest, RoleAssignMenusRequest } from '@/core/services/api';
import { useTranslations } from 'next-intl';
import { useRolesPageContext } from './hooks';
import { filterRequestParam } from '@/core/libs/base';
import { useCallback } from 'react';

export default function useRole() {
    const { message, modal } = App.useApp();
    const t = useTranslations();
    const context = useRolesPageContext();

    const createRole = useCallback(async (params: RoleCreateRequest) => {
        try {
            await SystemSettingRolesCreateApiV1(filterRequestParam(params));
            message.success(t('message.createSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.createFailed'));
        }
    }, [message, t, context.table]);

    const updateRole = useCallback(async (params: RoleUpdateRequest) => {
        try {
            await SystemSettingRolesUpdateApiV1(filterRequestParam(params));
            message.success(t('message.updateSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.updateFailed'));
        }
    }, [message, t, context.table]);

    const deleteRole = useCallback(async (params: RoleDeleteRequest) => {
        modal.confirm({
            title: t('modal.confirmDelete'),
            content: t('modal.confirmDeleteRole'),
            onOk: async () => {
                try {
                    await SystemSettingRolesDeleteApiV1(filterRequestParam(params));
                    message.success(t('message.deleteSuccess'));
                    context.table.reload();
                } catch (error) {
                    message.error(t('message.deleteFailed'));
                }
            }
        });
    }, [modal, t, message, context.table]);

    const updateRoleStatus = useCallback(async (params: RoleUpdateStatusRequest) => {
        modal.confirm({
            title: t('modal.confirmStatusChange'),
            content: params.status === 'active'
                ? t('modal.confirmEnableRole')
                : t('modal.confirmDisableRole'),
            onOk: async () => {
                try {
                    await SystemSettingRolesUpdateStatusApiV1(filterRequestParam(params));
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

    const assignMenus = useCallback(async (params: RoleAssignMenusRequest) => {
        try {
            await SystemSettingRolesAssignMenusApiV1(filterRequestParam(params));
            message.success(t('message.menusAssignedSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.menusAssignedFailed'));
        }
    }, [message, t, context.table]);

    return {
        createRole,
        updateRole,
        deleteRole,
        updateRoleStatus,
        assignMenus,
    };
}
