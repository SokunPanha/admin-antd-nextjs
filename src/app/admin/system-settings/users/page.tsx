"use client";

import { createPage } from "@/core/libs/base";
import UsersPage from '@/components/Page/Center/Users';
import { UsersPageProvider } from '@/components/Page/Center/Users/helper/hooks';
import { PageContainer } from "@ant-design/pro-components";

export default createPage(UsersPageProvider, PageContainer, UsersPage)
