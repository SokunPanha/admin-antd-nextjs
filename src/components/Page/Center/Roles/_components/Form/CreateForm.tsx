import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useRolesPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useRole from '../../helper/useRole'
import { formSubmitWrap } from '@/core/services'

export default function CreateForm() {
    const {createForm} = useRolesPageContext()
    const t = useTranslations()
    const {createRole} = useRole()

  return (
    <ModalForm
      {...createForm.props}
      title={t('modal.addRole')}
      onFinish={formSubmitWrap(createRole)}
    >
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
