'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const languages = {
  en: 'English',
  zh: '简体中文',
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
  };

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
      onClick: () => handleChange('en'),
    },
    {
      key: 'zh',
      label: '简体中文',
      onClick: () => handleChange('zh'),
    },
  ];

  return (
    <Dropdown menu={{ items, selectedKeys: [locale] }} placement="bottomRight">
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
        <GlobalOutlined style={{ fontSize: 16 }} />
        <span>{languages[locale as keyof typeof languages]}</span>
      </div>
    </Dropdown>
  );
}
