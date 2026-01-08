import { ProTable } from "@ant-design/pro-components";
import { useMenusPageContext } from "./helper/hooks";
import useFetchMenus from "./helper/useFetchMenus";
import { tableRequestWrap } from "@/core/services";
import Columns from "./_components/Columns";
import { AddButton } from "@/components/Common/Button/Add";
import CreateForm from "./_components/Form/CreateForm";
import { useTranslations } from "next-intl";
import UpdateForm from "./_components/Form/UpdateForm";
import { useMemo, useCallback } from "react";
import useMenu from "./helper/useMenu";

export default function MenusPage() {
  const context = useMenusPageContext()
  const {table, createForm} = context
  const {request} = useFetchMenus()
  const t = useTranslations()
  const { deleteMenu, updateMenuStatus } = useMenu()

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => Columns(t, context, deleteMenu, updateMenuStatus), [t, context, deleteMenu, updateMenuStatus]);

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
      expandable={{
        defaultExpandAllRows: false,
        indentSize: 24,
      }}
      pagination={false}
      />
    </div>
  )
}
