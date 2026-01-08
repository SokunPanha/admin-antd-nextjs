import { ProTable } from "@ant-design/pro-components";
import { useRolesPageContext } from "./helper/hooks";
import useFetchRoles from "./helper/useFetchRoles";
import { tableRequestWrap } from "@/core/services";
import Columns from "./_components/Columns";
import { AddButton } from "@/components/Common/Button/Add";
import CreateForm from "./_components/Form/CreateForm";
import { useTranslations } from "next-intl";
import UpdateForm from "./_components/Form/UpdateForm";
import AssignMenusForm from "./_components/Form/AssignMenusForm";
import { useMemo, useCallback } from "react";
import useRole from "./helper/useRole";

export default function RolesPage() {
  const context = useRolesPageContext()
  const {table, createForm, assignMenusForm} = context
  const {request} = useFetchRoles()
  const t = useTranslations()
  const { deleteRole, updateRoleStatus } = useRole()

  // Handle assign menus
  const handleAssignMenus = useCallback((record: any) => {
    assignMenusForm.open({
      role_id: record.id,
      role_name: record.name,
    });
  }, [assignMenusForm]);

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => Columns(t, context, deleteRole, updateRoleStatus, handleAssignMenus), [t, context, deleteRole, updateRoleStatus, handleAssignMenus]);

  // Memoize request wrapper
  const wrappedRequest = useMemo(() => tableRequestWrap(request), [request]);

  // Memoize header title callback
  const handleAddClick = useCallback(() => {
    createForm.open();
  }, [createForm]);

  return (
    <div>
      <CreateForm/>
      <UpdateForm/>
      <AssignMenusForm/>
      <ProTable
      {...table.props}
      headerTitle={
        <div>
          <AddButton onClick={handleAddClick} />
        </div>
      }
      request={wrappedRequest}
      columns={columns}
      rowKey={"id"}
      />
    </div>
  )
}
