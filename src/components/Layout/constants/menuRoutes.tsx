import { DingtalkSquareFilled, ProductFilled, GroupOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";

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
            path: '/admin/users',
            name: t('menu.users'),
            icon: <UserOutlined/>,
        },
        {
            path: '/admin/menus',
            name: t('menu.menus'),
            icon: <MenuOutlined/>,
        },
        // {
        //     path: '/admin/categories',
        //     name: t('menu.categories'),
        //     icon: <GroupOutlined/>,
        // },
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
            path: '/admin/users',
            name: 'Users',
            icon: <UserOutlined/>,
        },
        {
            path: '/admin/menus',
            name: 'Menus',
            icon: <MenuOutlined/>,
        },
        // {
        //     path: '/admin/categories',
        //     name: 'Categories',
        //     icon: <GroupOutlined/>,
        // },
    ],
};
