"use client"
import { createPage } from "@/core/libs/base";
import UserPage from "@/components/Page/Users";
import { UsersPageProvider } from "@/components/Page/Users/helper/hooks";
import { PageContainer } from "@ant-design/pro-components";

export default createPage(UsersPageProvider, PageContainer, UserPage)
