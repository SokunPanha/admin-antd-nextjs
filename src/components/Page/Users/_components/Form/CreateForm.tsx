import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'

export default function CreateForm() {
    const {createForm} = useUsersPageContext()
    const t = useTranslations()

  return (
    <ModalForm {...createForm.props} title={t('modal.addUser')} >
      <ProFormText
        name="name"
        label={t('label.name')}
        rules={[{ required: true, message: 'Please enter user name' }]}
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
      />
      <ProFormText
        name="cityname"
        label={t('label.cityname')}
        rules={[{ required: true, message: 'Please enter city name' }]}
      />
    </ModalForm>
  )
}
