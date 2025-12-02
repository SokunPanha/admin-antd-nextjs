"use client";

import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useLocale } from "@/contexts/LocaleContext";

interface LanguageSwitcherProps {
  onChange?: (locale: string) => void;
}

const languages = [
  {
    key: "en",
    label: "English",
    flag: "🇺🇸",
  },
  {
    key: "kh",
    label: "ភាសាខ្មែរ",
    flag: "🇰🇭",
  },
];

export default function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  const { locale: currentLocale, setLocale } = useLocale();

  const handleLanguageChange = (locale: string) => {
    setLocale(locale);
    onChange?.(locale);
  };

  const menuItems: MenuProps["items"] = languages.map((lang) => ({
    key: lang.key,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>{lang.flag}</span>
        <span>{lang.label}</span>
      </div>
    ),
    onClick: () => handleLanguageChange(lang.key),
  }));

  const currentLanguage = languages.find((lang) => lang.key === currentLocale);

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: 4,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span style={{ fontSize: 18 }}>{currentLanguage?.flag}</span>
        <span style={{ fontSize: 14 }}>{currentLanguage?.label}</span>
      </div>
    </Dropdown>
  );
}
