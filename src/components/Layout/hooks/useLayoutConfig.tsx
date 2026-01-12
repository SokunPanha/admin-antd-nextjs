"use client";

import { useMemo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dropdown, Input, Space, Button } from "antd";
import { QuestionCircleOutlined, BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
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
        // Failed to fetch profile, will use fallback
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
  const menuItemRender = useCallback((item: any, dom: React.ReactNode) => {
    // For items with children (parent items), ProLayout handles the icon automatically
    // For child items without children, we need to manually include the icon
    if (!item.children || item.children.length === 0) {
      return (
        <Link href={item.path || "/admin"} className="flex items-center gap-2">
          {item.icon}
          <span>{item.name}</span>
        </Link>
      );
    }
    // For parent items, just wrap the dom which includes the icon
    return <Link href={item.path || "/admin"}>{dom}</Link>;
  }, []);

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
