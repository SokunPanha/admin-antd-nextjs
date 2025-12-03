import { ProTable } from "@ant-design/pro-components";
import { useUsersPageContext } from "./helper/hooks";
import useFetchUsers from "./helper/useFetchUsers";
import { tableRequestWrap } from "@/core/services";
import Columns from "./_components/Columns";
import { AddButton } from "@/components/Common/Button/Add";
import CreateForm from "./_components/Form/CreateForm";
import { useTranslations } from "next-intl";
import UpdateForm from "./_components/Form/UpdateForm";

export default function UserPage() {
  const {table, createForm} = useUsersPageContext()
  const {request} = useFetchUsers()
  const t = useTranslations()

  return (
    <div>
      <CreateForm/>
      <UpdateForm/>
      <ProTable
        {...table.props}
        headerTitle={
          <div>
            <AddButton onClick={()=> {createForm.open()}} />
          </div>
        }
        request={tableRequestWrap(request)}
        columns={Columns(t)}
        rowKey={"id"}
      />
    </div>
  )
}
