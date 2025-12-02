'use client';

import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

const PageLayout = dynamic(() => import('@/components/Layout'), {
    ssr: false,
});

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<Record<string, string> | null>(null);
    const { locale } = useLocale();

    useEffect(() => {
        import(`@/messages/${locale}.ts`).then((module) => {
            setMessages(module.default);
        });
    }, [locale]);

    if (!messages) {
        return null;
    }

    return( <PageLayout>

       <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
       </NextIntlClientProvider>
    </PageLayout>)
}
