'use client';

import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginType = 'account' | 'mobile';

export default function LoginPage() {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const router = useRouter();

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                message.success('Login successful!');
                router.push('/admin');
            } else {
                message.error(data.message || 'Login failed!');
            }
        } catch (error) {
            message.error('An error occurred during login');
        }
    };

    return (
        <div className="bg-white h-screen bg-[url('https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp')] bg-cover bg-center">
            <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="Ant Design Admin"
                subTitle="The world's most popular React UI library"
                onFinish={handleSubmit}
                actions={
                    <div className="flex justify-center items-center flex-col">
                        <div className="block mb-6">
                            Other login methods
                        </div>
                        <div className="flex justify-center gap-6">
                            <AlipayCircleOutlined className="text-2xl text-[#1677ff] cursor-pointer" />
                            <TaobaoCircleOutlined className="text-2xl text-[#ff4d4f] cursor-pointer" />
                            <WeiboCircleOutlined className="text-2xl text-[#faad14] cursor-pointer" />
                        </div>
                    </div>
                }
            >
                <Tabs
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    centered
                    items={[
                        {
                            key: 'account',
                            label: 'Account Login',
                        },
                        {
                            key: 'mobile',
                            label: 'Phone Login',
                        },
                    ]}
                />
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'Email: admin@gmail.com'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter username!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'Password: admin'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter password!',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'mobile' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            name="mobile"
                            placeholder={'Mobile number'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter mobile number!',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: 'Invalid mobile number!',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'Captcha'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'Get Captcha'}`;
                                }
                                return 'Get Captcha';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Captcha!',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success('Captcha sent!');
                            }}
                        />
                    </>
                )}
                <div className="mb-6">
                    <ProFormCheckbox noStyle name="autoLogin">
                        Remember me
                    </ProFormCheckbox>
                    <a className="float-right">
                        Forgot password
                    </a>
                </div>
            </LoginForm>
        </div>
    );
}
