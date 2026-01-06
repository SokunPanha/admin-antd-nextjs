import { ProTable } from "@ant-design/pro-components";
import { useProductsPageContext } from "./helper/hooks";
import useFetchProduct from "./helper/useFetchProduct";
import { tableRequestWrap } from "@/core/services";
import Columns from "./_components/Columns";
import { AddButton } from "@/components/Common/Button/Add";
import CreateForm from "./_components/Form/CreateForm";
import { useTranslations } from "next-intl";
import UpdateForm from "./_components/Form/UpdateForm";
import { useMemo, useCallback } from "react";

export default function ProductPage() {
  const {table, createForm} = useProductsPageContext()
  const {request} = useFetchProduct()
  const t = useTranslations()

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => Columns(t), [t]);

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
      />
    </div>
  )
}
