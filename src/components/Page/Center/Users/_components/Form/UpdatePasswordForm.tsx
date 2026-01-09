import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useUser from '../../helper/useUser'

export default function UpdatePasswordForm() {
  const context = useUsersPageContext()
  const t = useTranslations()
  const { updatePassword } = useUser()

  return (
    <ModalForm
      {...context.updatePasswordForm.props}
      title={t('modal.updatePassword')}
      onFinish={async (values) => {
        return await updatePassword({
          id: context.updatePasswordForm.getData()?.id,
          new_password: values.new_password
        })
      }}
    >
      <ProFormText.Password
        name="new_password"
        label={t('label.newPassword')}
        placeholder={t('placeholder.enterNewPassword')}
        rules={[
          { required: true, message: t('validation.required') },
          { min: 6, message: t('validation.passwordMinLength') }
        ]}
      />
      <ProFormText.Password
        name="confirm_password"
        label={t('label.confirmPassword')}
        placeholder={t('placeholder.confirmPassword')}
        dependencies={['new_password']}
        rules={[
          { required: true, message: t('validation.required') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(t('validation.passwordMismatch')))
            },
          }),
        ]}
      />
    </ModalForm>
  )
}
