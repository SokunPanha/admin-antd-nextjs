import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useRolesPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useRole from '../../helper/useRole'
import { formSubmitWrap } from '@/core/services'

export default function UpdateForm() {
    const {updateForm} = useRolesPageContext()
    const t = useTranslations()
    const {updateRole} = useRole()

  return (
    <ModalForm
      {...updateForm.props}
      title={t('modal.editRole')}
      onFinish={formSubmitWrap(updateRole)}
    >
      <ProFormText
        name="id"
        hidden
      />

      <ProFormText
        name="name"
        label={t('label.name')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder={t('placeholder.enterRoleName')}
      />

      <ProFormText
        name="code"
        label={t('label.code')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder="e.g., admin, user, manager"
      />

      <ProFormTextArea
        name="description"
        label={t('label.description')}
        placeholder={t('placeholder.enterDescription')}
        fieldProps={{
          rows: 4
        }}
      />
    </ModalForm>
  )
}
