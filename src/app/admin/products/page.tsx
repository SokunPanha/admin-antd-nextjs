"use client"
import { createPage } from "@/core/libs/base";
import ProductPage from "@/components/Page/Products";
import { ProductsPageProvider } from "@/components/Page/Products/helper/hooks";
import { PageContainer } from "@ant-design/pro-components";

export default createPage(ProductsPageProvider, PageContainer, ProductPage)