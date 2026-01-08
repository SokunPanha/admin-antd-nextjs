import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useUser from '../../helper/useUser'
import { formSubmitWrap } from '@/core/services'

export default function CreateForm() {
    const {createForm} = useUsersPageContext()
    const t = useTranslations()
    const {createUser} = useUser()

  return (
    <ModalForm
      {...createForm.props}
      title={t('modal.addUser')}
      onFinish={formSubmitWrap(createUser)}
    >
      <ProFormText
        name="username"
        label={t('label.username')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder={t('placeholder.enterUsername')}
      />

      <ProFormText
        name="email"
        label={t('label.email')}
        rules={[
          { required: true, message: t('validation.required') },
          { type: 'email', message: t('validation.invalidEmail') }
        ]}
        placeholder={t('placeholder.enterEmail')}
      />

      <ProFormText.Password
        name="password"
        label={t('label.password')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder={t('placeholder.enterPassword')}
      />

      <ProFormText
        name="first_name"
        label={t('label.firstName')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder={t('placeholder.enterFirstName')}
      />

      <ProFormText
        name="last_name"
        label={t('label.lastName')}
        rules={[{ required: true, message: t('validation.required') }]}
        placeholder={t('placeholder.enterLastName')}
      />
    </ModalForm>
  )
}
