import { makeContext, useModalForm, useProTable } from "@/core/libs/base";

export const [ProductsPageProvider, useProductsPageContext] = makeContext(()=>{
    return {
        table: useProTable(),
        createForm: useModalForm(),
        updateForm: useModalForm()
    }
})