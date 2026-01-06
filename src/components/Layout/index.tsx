"use client";

import { QuestionCircleOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, Space, Button, App } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserMenuItems } from "./constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { menuRoutes } from "./constants/menuRoutes";
import { useMemo, useCallback } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  const handleLogout = useCallback(async () => {
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
  }, [message, router]);

  // Memoize header title render
  const headerTitleRender = useCallback(() => {
    return <div className="text-dark text-xl font-bold">Admin Management</div>;
  }, []);

  // Memoize location object
  const location = useMemo(() => ({ pathname }), [pathname]);

  // Memoize menu item renderer
  const menuItemRender = useCallback((item: any, dom: React.ReactNode) => (
    <Link href={item.path || "/admin"}>{dom}</Link>
  ), []);

  // Memoize user menu items
  const userMenuItems = useMemo(() => getUserMenuItems(handleLogout), [handleLogout]);

  // Memoize avatar props
  const avatarProps = useMemo(() => ({
    src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
    size: "small" as const,
    title: "Admin User",
    render: (_props: any, dom: React.ReactNode) => (
      <Dropdown menu={{ items: userMenuItems }}>
        {dom}
      </Dropdown>
    ),
  }), [userMenuItems]);

  // Memoize actions render
  const actionsRender = useCallback((props: any) => {
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
  }, []);

  return (
    <main
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        headerTitleRender={headerTitleRender}
        layout="mix"
        splitMenus={false}
        contentWidth="Fluid"
        fixedHeader
        fixSiderbar
        siderWidth={256}
        defaultCollapsed={false}
        location={location}
        menuItemRender={menuItemRender}
        avatarProps={avatarProps}
        actionsRender={actionsRender}
        route={{
          ...menuRoutes,
        }}
      >
          {children}
      </ProLayout>
    </main>
  );
}
