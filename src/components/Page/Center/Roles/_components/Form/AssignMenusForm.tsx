import { ModalForm, ProTable } from '@ant-design/pro-components'
import { useRolesPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useRole from '../../helper/useRole'
import { formSubmitWrap } from '@/core/services'
import { useMemo, useRef, useEffect, useState } from 'react'
import useFetchRoleMenus from './helper/useFetchRoleMenus'

export default function AssignMenusForm() {
    const {assignMenusForm} = useRolesPageContext()
    const t = useTranslations()
    const {assignMenus} = useRole()
    const {request, selectedMenuIds, setSelectedMenuIds, handleSelectionChange} = useFetchRoleMenus()
    const [roleId, setRoleId] = useState<number | null>(null)
    const itemsMapRef = useRef<Map<string, any>>(new Map())

    // Update role_id and reset selection when form opens
    useEffect(() => {
      if (assignMenusForm.props.open) {
        const formValues = assignMenusForm.props.form?.getFieldsValue()
        if (formValues?.role_id) {
          setRoleId(formValues.role_id)
        }
      } else {
        setSelectedMenuIds([])
        setRoleId(null)
      }
    }, [assignMenusForm.props.open, assignMenusForm.props.form, setSelectedMenuIds])

    const handleFinish = async () => {
        if (!roleId) return;

        await assignMenus({
            role_id: roleId,
            menu_ids: selectedMenuIds
        });
    };

    // Memoize columns
    const columns = useMemo(() => [
      {
        title: t('label.labelEn'),
        dataIndex: 'labels',
        key: 'label_en',
        render: (_: any, record: any) => record.labels?.en || '-'
      },
      {
        title: t('label.labelKh'),
        dataIndex: 'labels',
        key: 'label_kh',
        render: (_: any, record: any) => record.labels?.kh || '-'
      },
      {
        title: t('label.path'),
        dataIndex: 'route_path',
        key: 'route_path',
      },
      {
        title: t('label.icon'),
        dataIndex: 'icon',
        key: 'icon',
        render: (_: any, record: any) => record.icon || '-'
      },
    ], [t])

    // Wrap request to store itemsMap
    const wrappedRequest = async (params: any) => {
      const result = await request({
        ...params,
        role_id: roleId || undefined
      });

      // Store items map for selection logic
      if (result.data) {
        const buildMap = (items: any[], map: Map<string, any>) => {
          items.forEach((item: any) => {
            map.set(String(item.id), item);
            if (item.children && item.children.length > 0) {
              buildMap(item.children, map);
            }
          });
        };
        itemsMapRef.current.clear();
        buildMap(result.data, itemsMapRef.current);
      }

      return result;
    };

  return (
    <ModalForm
      {...assignMenusForm.props}
      title={t('modal.assignMenus')}
      onFinish={formSubmitWrap(handleFinish)}
      width={800}
    >
      <ProTable
        columns={columns}
        request={wrappedRequest}
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          indentSize: 24,
        }}
        rowSelection={{
          selectedRowKeys: selectedMenuIds,
          onChange: (selectedRowKeys) => {
            handleSelectionChange(selectedRowKeys, itemsMapRef.current, selectedMenuIds);
          },
          // checkStrictly: true,
        }}
      />
    </ModalForm>
  )
}
