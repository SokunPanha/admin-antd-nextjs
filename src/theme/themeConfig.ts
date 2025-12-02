import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration
 * Customize your design tokens here
 */
const themeConfig: ThemeConfig = {
    token: {
        // Primary color
        colorPrimary: '#1890ff',

        // Border radius
        borderRadius: 8,

        // Font
        fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',

        // Spacing
        controlHeight: 40,

        // Colors
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1890ff',
    },
    components: {
        Button: {
            controlHeight: 40,
            borderRadius: 8,
        },
        Input: {
            controlHeight: 40,
            borderRadius: 8,
        },
        Card: {
            borderRadiusLG: 12,
        },
    },
};

export default themeConfig;
