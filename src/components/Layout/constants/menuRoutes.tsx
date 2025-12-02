import { DingtalkSquareFilled, ProductFilled, GroupOutlined } from "@ant-design/icons";

export const getMenuRoutes = (t: (key: string) => string) => ({
    path: '/admin',
    routes: [
        {
            path: '/admin',
            name: t('menu.dashboard'),
            icon: <DingtalkSquareFilled/>
        },
        {
            path: '/admin/products',
            name: t('menu.products'),
            icon: <ProductFilled/>,
        },
        {
            path: '/admin/categories',
            name: t('menu.categories'),
            icon: <GroupOutlined/>,
        },
    ],
});

// Keep the old export for backward compatibility
export const menuRoutes = {
    path: '/admin',
    routes: [
        {
            path: '/admin',
            name: 'Dashboard',
            icon: <DingtalkSquareFilled/>
        },
        {
            path: '/admin/products',
            name: 'Products',
            icon: <ProductFilled/>,
        },
        {
            path: '/admin/categories',
            name: 'Categories',
            icon: <GroupOutlined/>,
        },
    ],
};
