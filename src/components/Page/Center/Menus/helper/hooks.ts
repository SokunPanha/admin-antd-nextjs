import { makeContext, useModalForm, useProTable } from "@/core/libs/base";

export const [MenusPageProvider, useMenusPageContext] = makeContext(()=>{
    return {
        table: useProTable(),
        createForm: useModalForm(),
        updateForm: useModalForm()
    }
})
