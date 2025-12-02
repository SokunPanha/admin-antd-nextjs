'use client';

import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import { useTranslations } from 'next-intl';

export default function AdminDashboard() {
    const t = useTranslations()
    return (
        <PageContainer title={t('dashboard.title')}>
            <ProCard direction="column" ghost gutter={[0, 16]}>
                <ProCard gutter={16} ghost>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title={t('dashboard.activeUsers')} value={112893} precision={0} />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title={t('dashboard.dailyVisits')} value={8846} precision={0} />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title={t('dashboard.totalRevenue')} value={93423} precision={2} prefix="$" />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title={t('dashboard.newOrders')} value={1234} precision={0} />
                    </ProCard>
                </ProCard>

                <ProCard title={t('dashboard.trafficAnalysis')} bordered headerBordered>
                    <div style={{ height: 360, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999' }}>
                        {/* {t('dashboard.chartPlaceholder')} */}
                    </div>
                </ProCard>
            </ProCard>
        </PageContainer>
    );
}
