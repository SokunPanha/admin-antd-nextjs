import { ModalForm, ProTable } from '@ant-design/pro-components'
import { useRolesPageContext } from '../../helper/hooks'
import { useTranslations } from 'next-intl'
import useRole from '../../helper/useRole'
import { tableRequestWrap } from '@/core/services'
import { useMemo, useEffect, useState } from 'react'
import { SystemSettingMenusListApiV1, SystemSettingRolesRoleBindMenuListApiV1 } from '@/core/services/api'

export default function AssignMenusForm() {
  const context = useRolesPageContext()
  const t = useTranslations()
  const { assignMenus } = useRole()
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [menuData, setMenuData] = useState<any[]>([])
  const roleId = context.assignMenusForm.getData()?.role_id

  // Fetch menus list
  const request = async () => {
    const response = await SystemSettingMenusListApiV1({
   
    } as any)

    const items = response.items || []

    // Transform flat array to tree structure
    const itemsMap = new Map()
    const rootItems: any[] = []

    // First pass: create a map of all items
    items.forEach((item: any) => {
      itemsMap.set(String(item.id), { ...item, children: [] })
    })

    // Second pass: build the tree structure
    items.forEach((item: any) => {
      const node = itemsMap.get(String(item.id))
      if (item.parent_id === null || item.parent_id === 0 || item.parent_id === "0") {
        rootItems.push(node)
      } else {
        const parent = itemsMap.get(String(item.parent_id))
        if (parent) {
          parent.children.push(node)
        } else {
          rootItems.push(node)
        }
      }
    })

    // Remove empty children arrays
    const cleanChildren = (items: any[]) => {
      items.forEach((item: any) => {
        if (item.children && item.children.length === 0) {
          delete item.children
        } else if (item.children && item.children.length > 0) {
          cleanChildren(item.children)
        }
      })
    }

    cleanChildren(rootItems)

    return {
      data: rootItems,
      total: response.total || 0,
      success: true
    }
  }

  // Fetch role's assigned menus when modal opens
  useEffect(() => {
    const fetchSelectedMenu = async () => {
      try {
        const response = await SystemSettingRolesRoleBindMenuListApiV1({
          role_id: roleId
        })

        if (response?.menu_ids?.length) {
          setSelectedRowKeys(response.menu_ids)
        } else {
          setSelectedRowKeys([])
        }
      } catch (error) {
        console.log(error)
      }
    }

    // Only fetch when modal is open and roleId exists
    if (context.assignMenusForm.props.open && roleId) {
      fetchSelectedMenu()
    }

    // Reset state when modal closes
    if (!context.assignMenusForm.props.open) {
      setSelectedRowKeys([])
    }
  }, [context.assignMenusForm.props.open, roleId])

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

  return (
    <ModalForm
      {...context.assignMenusForm.props}
      title={t('modal.assignMenus')}
      onFinish={async () => {
        return await assignMenus({
          role_id: roleId,
          menu_ids: selectedRowKeys
        })
      }}
      width={800}
    >
      <ProTable
        columns={columns}
        request={tableRequestWrap(async () => {
          const result = await request()
          setMenuData(result.data || [])
          return result
        })}
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          indentSize: 24,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys, rows) => {
            // Helper function to find a row by id in the full menu tree
            const findRowById = (data: any[], id: React.Key): any => {
              for (const item of data) {
                if (item.id === id) return item
                if (item.children?.length) {
                  const found = findRowById(item.children, id)
                  if (found) return found
                }
              }
              return null
            }

            // Helper function to collect all descendant IDs (children, grandchildren, etc.)
            const collectAllDescendantIds = (item: any): React.Key[] => {
              const descendants: React.Key[] = []
              if (item.children?.length) {
                item.children.forEach((child: any) => {
                  descendants.push(child.id)
                  descendants.push(...collectAllDescendantIds(child))
                })
              }
              return descendants
            }

            // Helper function to find parent of a node
            const findParentById = (data: any[], childId: React.Key, parent: any = null): any => {
              for (const item of data) {
                if (item.id === childId) return parent
                if (item.children?.length) {
                  const found = findParentById(item.children, childId, item)
                  if (found !== null) return found
                }
              }
              return null
            }

            // Find which items were added or removed
            const previousSelection = new Set(selectedRowKeys)
            const newSelection = new Set(keys)

            const added = Array.from(newSelection).filter(key => !previousSelection.has(key))
            const removed = Array.from(previousSelection).filter(key => !newSelection.has(key))

            // Start with new selection
            const selection = new Set<React.Key>(keys)

            // Handle additions: when parent is selected, select all descendants
            added.forEach((id) => {
              const fullMenuItem = findRowById(menuData, id)
              if (fullMenuItem) {
                selection.add(fullMenuItem.id)
                const descendants = collectAllDescendantIds(fullMenuItem)
                descendants.forEach(descendantId => selection.add(descendantId))
              }
            })

            // Handle removals: when parent is deselected, deselect all descendants
            removed.forEach((id) => {
              const fullMenuItem = findRowById(menuData, id)
              if (fullMenuItem) {
                selection.delete(fullMenuItem.id)
                const descendants = collectAllDescendantIds(fullMenuItem)
                descendants.forEach(descendantId => selection.delete(descendantId))
              }
            })

            // Auto-select parent if at least one child is selected
            const autoSelectParents = (currentSelection: Set<React.Key>) => {
              const updated = new Set<React.Key>(currentSelection)

              // For each selected item, ensure all ancestors are selected
              Array.from(currentSelection).forEach(id => {
                let parent = findParentById(menuData, id)
                while (parent) {
                  updated.add(parent.id)
                  parent = findParentById(menuData, parent.id)
                }
              })

              return updated
            }

            // Auto-deselect parent if no children are selected
            const autoDeselectParents = (currentSelection: Set<React.Key>) => {
              const updated = new Set<React.Key>(currentSelection)

              // Helper function to check if a node has any selected children
              const hasSelectedChildren = (item: any): boolean => {
                if (!item.children?.length) return false

                // Check if any direct child is selected
                for (const child of item.children) {
                  if (updated.has(child.id)) return true
                  // Also check descendants recursively
                  if (hasSelectedChildren(child)) return true
                }
                return false
              }

              // Remove parents that have no selected children
              const checkAndRemoveEmptyParents = () => {
                let changed = true
                while (changed) {
                  changed = false
                  Array.from(updated).forEach(id => {
                    const item = findRowById(menuData, id)
                    if (item?.children?.length && !hasSelectedChildren(item)) {
                      updated.delete(id)
                      changed = true
                    }
                  })
                }
              }

              checkAndRemoveEmptyParents()
              return updated
            }

            // Apply parent auto-selection
            let finalSelection = autoSelectParents(selection)

            // Apply parent auto-deselection
            finalSelection = autoDeselectParents(finalSelection)

            setSelectedRowKeys(Array.from(finalSelection))
          },
        }}
      />
    </ModalForm>
  )
}
