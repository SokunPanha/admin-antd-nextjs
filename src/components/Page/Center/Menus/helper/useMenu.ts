import { App } from 'antd';
import { SystemSettingMenusCreateApiV1, SystemSettingMenusUpdateApiV1, SystemSettingMenusDeleteApiV1, SystemSettingMenusUpdateStatusApiV1, MenuCreateRequest, MenuUpdateRequest, MenuDeleteRequest } from '@/core/services/api';
import { useTranslations } from 'next-intl';
import { useMenusPageContext } from './hooks';
import { filterRequestParam } from '@/core/libs/base';

// Form values type (what comes from the form before transformation)


export default function useMenu() {
    const { message, modal } = App.useApp();
    const t = useTranslations();
    const context = useMenusPageContext();

    const createMenu = async (values: MenuCreateRequest) => {
        try {
            await SystemSettingMenusCreateApiV1(filterRequestParam(values));

            message.success(t('message.createSuccess'));
            context.table.reload();

        } catch (error) {
            message.error(t('message.createFailed'));
        }
    };

    const updateMenu = async (params: MenuUpdateRequest) => {
        try {
            await SystemSettingMenusUpdateApiV1({
                ...params
            });

            message.success(t('message.updateSuccess'));
            context.table.reload();
        } catch (error) {
            message.error(t('message.updateFailed'));
        }
    };

    const deleteMenu = async (params: MenuDeleteRequest) => {
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
    };

    const updateMenuStatus = async (params: MenuUpdateRequest) => {
        try {
            await SystemSettingMenusUpdateStatusApiV1(filterRequestParam(params));
            message.success(t('message.statusUpdated'));
            context.table.reload();
            return true;
        } catch (error) {
            message.error(t('message.updateFailed'));
            return false;
        }
    };

    return {
        createMenu,
        updateMenu,
        deleteMenu,
        updateMenuStatus,
    };
}
