import { makeContext, useModalForm, useProTable } from "@/core/libs/base";

export const [UsersPageProvider, useUsersPageContext] = makeContext(() => {
    return {
        table: useProTable(),
        createForm: useModalForm(),
        updateForm: useModalForm()
    }
})
