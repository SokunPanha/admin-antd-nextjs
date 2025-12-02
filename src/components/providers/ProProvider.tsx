"use client";

import { ProConfigProvider, enUSIntl, zhCNIntl } from "@ant-design/pro-components";
import { ReactNode } from "react";
import { kmKHIntl } from "@/messages/locales/km_KH";

interface ProProviderProps {
  children: ReactNode;
  locale?: string;
}

export default function ProProvider({ children, locale = "en" }: ProProviderProps) {
  const getProIntl = () => {
    switch (locale) {
      case "zh":
        return zhCNIntl;
      case "km":
      case "kh":
      case "km-KH":
        return kmKHIntl;
      default:
        return enUSIntl;
    }
  };

  return <ProConfigProvider intl={getProIntl()}>{children}</ProConfigProvider>;
}
