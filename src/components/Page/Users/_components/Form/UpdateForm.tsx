import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'

export default function UpdateForm() {
    const {updateForm} = useUsersPageContext()
    const t = useTranslations()

  return (
    <ModalForm {...updateForm.props} title={t('modal.editUser')} >
      <ProFormText
        name="name"
        label={t('label.name')}
        rules={[{ required: true, message: 'Please enter user name' }]}
        placeholder="Enter user name"
      />
      <ProFormText
        name="avatar"
        label={t('label.avatar')}
        rules={[{ required: true, message: 'Please enter avatar URL' }]}
        placeholder="https://example.com/avatar.jpg"
      />
      <ProFormText
        name="country"
        label={t('label.country')}
        rules={[{ required: true, message: 'Please enter country' }]}
        placeholder="Enter country"
      />
      <ProFormText
        name="cityname"
        label={t('label.cityname')}
        rules={[{ required: true, message: 'Please enter city name' }]}
        placeholder="Enter city name"
      />
    </ModalForm>
  )
}
