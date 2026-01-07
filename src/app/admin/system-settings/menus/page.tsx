"use client"
import { createPage } from "@/core/libs/base";
import MenusPage from "@/components/Page/Center/Menus";
import { MenusPageProvider } from "@/components/Page/Center/Menus/helper/hooks";
import { PageContainer } from "@ant-design/pro-components";

export default createPage(MenusPageProvider, PageContainer, MenusPage)
