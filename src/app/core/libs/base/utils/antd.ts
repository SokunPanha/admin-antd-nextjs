import { ModalConfirm } from "@/components/Common/ModalConfim"
import {type ProColumns} from "@ant-design/pro-table"
import {Modal} from 'antd'
export const defineColumns = <T,>(columns: ProColumns<any>[]): any => {
  return columns
}

export const modalConfirm = (content: string,title = 'Алдаа', okText='батлах', cancelText = 'Цуцлах') => {
  return new Promise((resolve) => {
    ModalConfirm({
      title,
      content,
      okText: okText,
      cancelText: cancelText,
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      },
    })
  })
}
