import { ProTable } from "@ant-design/pro-components";
import { useUsersPageContext } from "./helper/hooks";
import useFetchUsers from "./helper/useFetchUsers";
import { tableRequestWrap } from "@/core/services";
import Columns from "./_components/Columns";
import { AddButton } from "@/components/Common/Button/Add";
import CreateForm from "./_components/Form/CreateForm";
import { useTranslations } from "next-intl";
import UpdateForm from "./_components/Form/UpdateForm";
import AssignRolesForm from "./_components/Form/AssignRolesForm";
import UpdatePasswordForm from "./_components/Form/UpdatePasswordForm";
import { useMemo, useCallback } from "react";
import useUser from "./helper/useUser";

export default function UsersPage() {
  const context = useUsersPageContext()
  const {table, createForm, assignRolesForm, updatePasswordForm} = context
  const {request} = useFetchUsers()
  const t = useTranslations()
  const { deleteUser, updateUserStatus } = useUser()

  // Handle assign roles
  const handleAssignRoles = useCallback((record: any) => {
    assignRolesForm.open(record);
  }, [assignRolesForm]);

  // Handle update password
  const handleUpdatePassword = useCallback((record: any) => {
    updatePasswordForm.open(record);
  }, [updatePasswordForm]);

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => Columns(t, context, deleteUser, updateUserStatus, handleAssignRoles, handleUpdatePassword), [t, context, deleteUser, updateUserStatus, handleAssignRoles, handleUpdatePassword]);

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
      <AssignRolesForm/>
      <UpdatePasswordForm/>
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
