"use client";

import { createPage } from "@/core/libs/base";
import RolesPage from '@/components/Page/Center/Roles';
import { RolesPageProvider } from '@/components/Page/Center/Roles/helper/hooks';
import { PageContainer } from "@ant-design/pro-components";

export default createPage(RolesPageProvider, PageContainer, RolesPage)
