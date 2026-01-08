import { ModalForm, ProFormTreeSelect } from '@ant-design/pro-components'
import { useRolesPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useRole from '../../helper/useRole'
import { formSubmitWrap } from '@/core/services'
import { SystemSettingMenusParentMenuMasterdataApiV1 } from '@/core/services/api'

export default function AssignMenusForm() {
    const {assignMenusForm} = useRolesPageContext()
    const t = useTranslations()
    const {assignMenus} = useRole()

    const handleFinish = async (values: any) => {
        await assignMenus({
            role_id: values.role_id,
            menu_ids: values.menu_ids || []
        });
        return true;
    };

  return (
    <ModalForm
      {...assignMenusForm.props}
      title={t('modal.assignMenus')}
      onFinish={formSubmitWrap(handleFinish)}
    >
      <ProFormTreeSelect
        name="role_id"
        hidden
      />

      <ProFormTreeSelect
        name="menu_ids"
        label={t('label.menus')}
        placeholder={t('placeholder.selectMenus')}
        rules={[{ required: true, message: t('validation.required') }]}
        request={async () => {
          try {
            const res = await SystemSettingMenusParentMenuMasterdataApiV1({
              status: 'active'
            });

            // Transform to tree structure for ProFormTreeSelect
            return res.items.map((item) => ({
              title: item.label,
              value: item.id,
              key: item.id,
            }));
          } catch (error) {
            console.error('Failed to fetch menus:', error);
            return [];
          }
        }}
        fieldProps={{
          treeCheckable: true,
          showCheckedStrategy: 'SHOW_ALL',
          placeholder: t('placeholder.selectMenus'),
          treeDefaultExpandAll: false,
        }}
      />
    </ModalForm>
  )
}
