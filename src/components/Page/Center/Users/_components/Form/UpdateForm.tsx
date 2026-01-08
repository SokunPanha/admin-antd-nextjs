import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useUser from '../../helper/useUser'
import { formSubmitWrap } from '@/core/services'

export default function UpdateForm() {
    const {updateForm} = useUsersPageContext()
    const t = useTranslations()
    const {updateUser} = useUser()

  return (
    <ModalForm
      {...updateForm.props}
      title={t('modal.editUser')}
      onFinish={formSubmitWrap(updateUser)}
    >
      <ProFormText
        name="id"
        hidden
      />

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

      <ProFormText
        name="phone_number"
        label={t('label.phoneNumber')}
        placeholder={t('placeholder.enterPhoneNumber')}
      />
    </ModalForm>
  )
}
