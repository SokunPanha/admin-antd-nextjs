import { ModalForm } from '@ant-design/pro-components'
import React from 'react'
import { useProductsPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'

export default function CreateForm() {
    const {createForm} = useProductsPageContext()
    const t = useTranslations()
  return (
    <ModalForm {...createForm.props} title={t('modal.create_form')} >
        
    </ModalForm>
  )
}
