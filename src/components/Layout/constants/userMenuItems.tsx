import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

export const getUserMenuItems = (onLogout: () => void): MenuProps['items'] => [
    // {
    //     key: 'profile',
    //     icon: <UserOutlined />,
    //     label: 'Profile',
    // },
    // {
    //     key: 'settings',
    //     icon: <SettingOutlined />,
    //     label: 'Settings',
    // },
    // {
    //     type: 'divider',
    // },
    {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        onClick: onLogout,
    },
];
