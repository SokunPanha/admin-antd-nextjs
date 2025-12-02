import { DingtalkSquareFilled, ProductFilled, GroupOutlined } from "@ant-design/icons";

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
