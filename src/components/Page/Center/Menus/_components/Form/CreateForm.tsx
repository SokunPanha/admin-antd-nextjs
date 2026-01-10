import { ModalForm, ProFormText, ProFormDigit, ProFormSwitch } from '@ant-design/pro-components'
import { useMenusPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useMenu from '../../helper/useMenu'
import { formSubmitWrap } from '@/core/services'
import AutoCompleteParentMenu from '@/components/Common/AutoComplete/AutoCompleteParentMenu'

export default function CreateForm() {
    const {createForm} = useMenusPageContext()
    const t = useTranslations()
    const {createMenu} = useMenu()

  return (
    <ModalForm
      {...createForm.props}
      title={t('modal.addMenu')}
      onFinish={formSubmitWrap(createMenu)}
    >
      <ProFormText
        name={["labels", 'en']}
        label={t('label.labelEn')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder="English label"
      />

      <ProFormText
        name={["labels", 'kh']}
        label={t('label.labelKh')}
        placeholder="Khmer label (optional)"
      />

      <ProFormText
        name="icon"
        label={t('label.icon')}
        placeholder="e.g., DashboardOutlined"
      />

      <ProFormText
        name="route_path"
        label={t('label.path')}
        placeholder="e.g., /admin/dashboard"
      />

      <ProFormDigit
        name="sort_order"
        label={t('label.sortOrder')}
        min={0}
        initialValue={0}
        fieldProps={{
          precision: 0,
        }}
      />

      <AutoCompleteParentMenu />

      <ProFormSwitch
        name="is_visible"
        label={t('label.visible')}
        initialValue={true}
      />
    </ModalForm>
  )
}
