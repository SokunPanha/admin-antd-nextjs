"use client";

import { ConfigProvider, theme, App } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import kmKH from "antd/lib/locale/km_KH";
import ProProvider from "./ProProvider";
import { ReactNode } from "react";
import type { ThemeConfig } from "antd";
import {
  LocaleProvider as LocaleContextProvider,
  useLocale,
} from "@/contexts/LocaleContext";
import { useTheme } from "@/contexts/ThemeContext";

interface LocaleProviderProps {
  children: ReactNode;
  themeConfig: ThemeConfig;
}

function LocaleProviderInner({ children, themeConfig }: LocaleProviderProps) {
  const { locale } = useLocale();

  const getAntdLocale = () => {
    switch (locale) {
      case "zh":
        return zhCN;
      case "km":
      case "kh":
      case "km-KH":
        return kmKH;
      default:
        return enUS;
    }
  };

  return (
    <ProProvider locale={locale}>
      <ConfigProvider locale={getAntdLocale()} theme={themeConfig}>
        <App>
          {children}
        </App>
      </ConfigProvider>
    </ProProvider>
  );
}

export default function LocaleProvider({
  children,
  themeConfig,
}: LocaleProviderProps) {
  const { theme: currentTheme } = useTheme();
  // Merge theme config with dynamic algorithm based on current theme
  const mergedThemeConfig: ThemeConfig = {
    ...themeConfig,
    algorithm:
      currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <LocaleContextProvider>
      <LocaleProviderInner themeConfig={mergedThemeConfig}>
        {children}
      </LocaleProviderInner>
    </LocaleContextProvider>
  );
}
