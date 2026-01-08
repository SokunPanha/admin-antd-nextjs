import { ModalForm, ProTable } from '@ant-design/pro-components'
import { useUsersPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useUser from '../../helper/useUser'
import { useEffect, useState, useMemo } from 'react'
import { SystemSettingRolesListApiV1, SystemSettingCenterUsersUserBindRoleListApiV1 } from '@/core/services/api'
import { tableRequestWrap } from '@/core/services'

export default function AssignRolesForm() {
    const context = useUsersPageContext()
    const t = useTranslations()
    const { assignRoles } = useUser()
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
    const userId = context.assignRolesForm.getData()?.id

    // Fetch roles list
    const request = async (params: any) => {
      const response = await SystemSettingRolesListApiV1({
        ...params,
        page: params.current || 1,
        page_size: params.pageSize || 1000,
        status: 'active',
        sort: { field: 'id', direction: 'asc' },
        id: 0,
        name: '',
        code: '',
        menu_ids: [],
        created_at_from: '',
        created_at_to: ''
      } as any)

      return {
        data: response.items || [],
        total: response.total || 0,
        success: true
      }
    }

    // Fetch user's assigned roles when modal opens
    useEffect(() => {
      const requestAssignedRole = async () => {
        try {
          const response = await SystemSettingCenterUsersUserBindRoleListApiV1({
            user_id: userId
          })

          if (response?.role_ids?.length) {
            setSelectedRowKeys(response.role_ids)
          } else {
            setSelectedRowKeys([])
          }
        } catch (error) {
          console.log(error)
        }
      }

      if (userId) {
        requestAssignedRole()
      }
    }, [userId])

    // Memoize columns
    const columns = useMemo(() => [
      {
        title: t('tableColumn.id'),
        dataIndex: 'id',
        width: 80,
      },
      {
        title: t('tableColumn.name'),
        dataIndex: 'name',
      },
      {
        title: t('tableColumn.code'),
        dataIndex: 'code',
      },
      {
        title: t('tableColumn.description'),
        dataIndex: 'description',
        ellipsis: true,
      },
    ], [t])

    return (
      <ModalForm
        {...context.assignRolesForm.props}
        title={t('modal.assignRoles')}
        onFinish={async () => {
          return await assignRoles({
            role_ids: selectedRowKeys,
            user_id: userId
          })
        }}
        width={800}
      >
        <ProTable
          search={false}
          options={false}
          pagination={false}
          request={tableRequestWrap(request)}
          columns={columns}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => {
              setSelectedRowKeys(keys as any[])
            },
          }}
        />
      </ModalForm>
    )
}
