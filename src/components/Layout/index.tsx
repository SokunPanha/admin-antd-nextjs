"use client";

import { QuestionCircleOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, Space, Button, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserMenuItems } from "./constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { menuRoutes } from "./constants/menuRoutes";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        message.success('Logout successful!');
        router.push('/login');
      } else {
        message.error(data.message || 'Logout failed!');
      }
    } catch (error) {
      message.error('An error occurred during logout');
    }
  };
  return (
    <main
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        // title="Ant Design Admin"
        layout="mix"
        splitMenus={false}
        contentWidth="Fluid"
        fixedHeader
        fixSiderbar
        siderWidth={256}
        defaultCollapsed={false}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/admin"}>{dom}</Link>
        )}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "Admin User",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: getUserMenuItems(handleLogout),
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <Space.Compact key="search" style={{ marginTop: 4 }}>
              <Input
                style={{ width: 200 }}
                placeholder="Search..."
              />
              <Button type="primary" icon={<SearchOutlined />} />
            </Space.Compact>,
            <ThemeSwitcher key="theme" />,
            <LanguageSwitcher key="language" />,
            <QuestionCircleOutlined
              key="QuestionCircleOutlined"
              style={{ fontSize: 16 }}
            />,
            <BellOutlined key="BellOutlined" style={{ fontSize: 16 }} />,
          ];
        }}
        route={{
          ...menuRoutes,
        }}
      >
          {children}
      </ProLayout>
    </main>
  );
}
