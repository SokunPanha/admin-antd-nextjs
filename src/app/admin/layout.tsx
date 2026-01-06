'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useMemo } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import enMessages from '@/messages/en';
import khMessages from '@/messages/kh';
import PageLayout from '@/components/Layout';

const messagesMap = {
    en: enMessages,
    zh: enMessages, // Fallback to English
    km: khMessages,
    'km-KH': khMessages,
    kh: khMessages,
} as const;

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { locale } = useLocale();

    const messages = useMemo(() => messagesMap[locale as keyof typeof messagesMap] || enMessages, [locale]);

    return( <PageLayout>
       <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
       </NextIntlClientProvider>
    </PageLayout>)
}
