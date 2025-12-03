import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components'
import React from 'react'
import { useProductsPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'

export default function UpdateForm() {
    const {updateForm} = useProductsPageContext()
    const t = useTranslations()
  return (
    <ModalForm {...updateForm.props} title={t('modal.editProduct')} >
      <ProFormText
        name="name"
        label={t('label.name')}
        rules={[{ required: true, message: 'Please enter product name' }]}
      />
      <ProFormDigit
        name="price"
        label={t('label.price')}
        rules={[{ required: true, message: 'Please enter product price' }]}
        min={0}
        fieldProps={{
          precision: 2,
        }}
      />
      <ProFormText
        name="image"
        label={t('label.image')}
        rules={[{ required: true, message: 'Please enter product image URL' }]}
        placeholder="https://example.com/image.jpg"
      />
    </ModalForm>
  )
}
