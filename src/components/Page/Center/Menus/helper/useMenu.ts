import { App } from 'antd';
import { SystemSettingMenusCreateApiV1, SystemSettingMenusUpdateApiV1, SystemSettingMenusDeleteApiV1, SystemSettingMenusUpdateStatusApiV1, MenuCreateRequest, MenuUpdateRequest, MenuDeleteRequest, MenuUpdateStatusRequest } from '@/core/services/api';
import { useTranslations } from 'next-intl';
import { useMenusPageContext } from './hooks';
import { filterRequestParam } from '@/core/libs/base';
import { useCallback } from 'react';

// Form values type (what comes from the form before transformation)


export default function useMenu() {
    const { message, modal } = App.useApp();
    const t = useTranslations();
    const context = useMenusPageContext();

    const createMenu = useCallback(async (params: MenuCreateRequest) => {

        try {
            await SystemSettingMenusCreateApiV1(filterRequestParam(params));

            message.success(t('message.createSuccess'));
            context.table.reload();

        } catch (error) {
            message.error(t('message.createFailed'));
        }
    }, [message, t, context.table]);

    const updateMenu = useCallback(async (params: MenuUpdateRequest) => {
        try {
            await SystemSettingMenusUpdateApiV1({
                ...params
            });

            message.success(t('message.updateSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.updateFailed'));
        }
    }, [message, t, context.table]);

    const deleteMenu = useCallback(async (params: MenuDeleteRequest) => {
        modal.confirm({
            title: t('modal.confirmDelete'),
            content: t('modal.confirmDeleteMenu'),
            onOk: async () => {
                try {
                    await SystemSettingMenusDeleteApiV1(filterRequestParam(params));
                    message.success(t('message.deleteSuccess'));
                    context.table.reload();
                } catch (error) {
                    message.error(t('message.deleteFailed'));
                }
            }
        });
    }, [modal, t, message, context.table]);

    const updateMenuStatus = useCallback(async (params: MenuUpdateStatusRequest) => {
        modal.confirm({
            title: t('modal.confirmStatusChange'),
            content: params.status === 'active'
                ? t('modal.confirmEnableMenu')
                : t('modal.confirmDisableMenu'),
            onOk: async () => {
                try {
                    await SystemSettingMenusUpdateStatusApiV1(filterRequestParam(params));
                    message.success(t('message.statusUpdated'));
                    context.table.reload();
                    return true;
                } catch (error) {
                    message.error(t('message.updateFailed'));
                    return false;
                }
            },
            onCancel: () => {
                // Reload table to reset the switch state
                context.table.reload();
            }
        });
    }, [modal, t, message, context.table]);

    return {
        createMenu,
        updateMenu,
        deleteMenu,
        updateMenuStatus,
    };
}
