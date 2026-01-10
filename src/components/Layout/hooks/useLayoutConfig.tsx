"use client";

import { useMemo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dropdown, Input, Space, Button } from "antd";
import { QuestionCircleOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { getUserMenuItems } from "../constants";
import { AuthProfileApiV1 } from "@/core/services/api";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export function useLayoutConfig(onLogout: () => void) {
  const pathname = usePathname();
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await AuthProfileApiV1();
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // User menu items
  const userMenuItems = useMemo(() => getUserMenuItems(onLogout), [onLogout]);

  // Header title
  const headerTitleRender = useCallback(() => {
    return <div className="text-dark text-xl font-bold">Admin Management</div>;
  }, []);

  // Current location
  const location = useMemo(() => ({ pathname }), [pathname]);

  // Menu item renderer with link
  const menuItemRender = useCallback((item: any, dom: React.ReactNode) => (
    <Link href={item.path || "/admin"}>{dom}</Link>
  ), []);

  // Avatar configuration
  const avatarProps = useMemo(() => ({
    src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
    size: "small" as const,
    title: userProfile?.username || "Admin User",
    render: (_props: any, dom: React.ReactNode) => (
      <Dropdown menu={{ items: userMenuItems }}>
        {dom}
      </Dropdown>
    ),
  }), [userMenuItems, userProfile]);

  // Header actions
  const actionsRender = useCallback((props: any) => {
    if (props.isMobile) return null;

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

  return {
    headerTitleRender,
    location,
    menuItemRender,
    avatarProps,
    actionsRender,
  };
}
