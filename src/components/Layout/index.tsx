"use client";

import { ProLayout } from "@ant-design/pro-components";
import { usePathname } from "next/navigation";
import { useMenuData } from "./hooks/useMenuData";
import { useLogout } from "./hooks/useLogout";
import { useLayoutConfig } from "./hooks/useLayoutConfig";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();

  // Fetch dynamic menu data from API
  const { menuData, loading: menuLoading, error: menuError } = useMenuData();

  // Logout handler
  const handleLogout = useLogout();

  // Layout configuration
  const {
    headerTitleRender,
    location,
    menuItemRender,
    avatarProps,
    actionsRender,
  } = useLayoutConfig(handleLogout);

  // Show loading state
  if (menuLoading) {
    return <LoadingState />;
  }

  // Show error state
  if (menuError || !menuData) {
    return <ErrorState error={menuError} />;
  }

  return (
    <main  style={{ height: "100vh" }}>
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
        route={menuData}

      >
        <div key={pathname} className="animate-fade-in">
          {children}
        </div>
      </ProLayout>
    </main>
  );
}
