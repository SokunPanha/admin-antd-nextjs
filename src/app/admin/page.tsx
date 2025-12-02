'use client';

import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import { useTranslations } from 'next-intl';

export default function AdminDashboard() {
    const t = useTranslations()
    return (
        <PageContainer title="Dashboard">
            <ProCard direction="column" ghost gutter={[0, 16]}>
                <ProCard gutter={16} ghost>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title="Active Users" value={112893} precision={0} />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title="Daily Visits" value={8846} precision={0} />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title="Total Revenue" value={93423} precision={2} prefix="$" />
                    </ProCard>
                    <ProCard colSpan={6} layout="center" bordered>
                        <Statistic title="New Orders" value={1234} precision={0} />
                    </ProCard>
                </ProCard>

                <ProCard title="Traffic Analysis" bordered headerBordered>
                    <div style={{ height: 360, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999' }}>
                        Chart Placeholder (Integrate with @ant-design/charts or similar)
                    </div>
                </ProCard>
            </ProCard>
            {t('welcome')}
        </PageContainer>
    );
}
