import { makeContext, useModalForm, useProTable } from "@/core/libs/base";

export const [RolesPageProvider, useRolesPageContext] = makeContext(()=>{
    return {
        table: useProTable(),
        createForm: useModalForm(),
        updateForm: useModalForm(),
        assignMenusForm: useModalForm()
    }
})
