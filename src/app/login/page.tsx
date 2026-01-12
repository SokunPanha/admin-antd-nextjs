"use client";

import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Tabs, App } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { useLocale } from "@/contexts/LocaleContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useTheme } from "@/contexts/ThemeContext";

type LoginType = "account" | "mobile";

function LoginContent() {
  const [loginType, setLoginType] = useState<LoginType>("account");
  const router = useRouter();
  const t = useTranslations("login");
  const { theme } = useTheme();
  const { notification } = App.useApp();

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data)

      // Check if response is successful
      if (response.ok) {
        console.log('login success');
        notification.success({
          title: t("loginSuccess"),
          description: t("loginSuccess"),
          duration: 4,
        } as any);
        router.push("/admin");
      } else {
        // Show error notification with details from backend
        notification.error({
          title: t("loginFailed"),
          description: data.error || t("loginError"),
          duration: 4,
        } as any);
      }
    } catch (error: any) {
      // Network or other errors
      notification.error({
        title: t("loginError"),
        description: error?.message || "An unexpected error occurred",
        duration: 4,
      } as any);
    }
  };

  return (
    <div
      className={`h-screen flex justify-center items-center bg-cover bg-center transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-3 items-center">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md px-4">
        <LoginForm
          style={{
            // background: 'url("./images/logo.svg")'
          }}
          title={t('title')}
          // subTitle={t('subtitle')}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: t("loginButton"),
            },
          }}
          // actions={
          //     <div className="flex justify-center items-center flex-col">
          //         <div className="block mb-6">
          //             {t('otherLoginMethods')}
          //         </div>
          //         <div className="flex justify-center gap-6">
          //             <AlipayCircleOutlined className="text-2xl text-[#1677ff] cursor-pointer" />
          //             <TaobaoCircleOutlined className="text-2xl text-[#ff4d4f] cursor-pointer" />
          //             <WeiboCircleOutlined className="text-2xl text-[#faad14] cursor-pointer" />
          //         </div>
          //     </div>
          // }
        >
          <Tabs
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            centered
            items={[
            //   {
            //     key: "account",
            //     label: t("accountLogin"),
            //   },
              // {
              //     key: 'mobile',
              //     label: t('phoneLogin'),
              // },
            ]}
          />
          {loginType === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={t("emailPlaceholder")}
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterUsername"),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder={t("passwordPlaceholder")}
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterPassword"),
                  },
                ]}
              />
            </>
          )}
          {/* {loginType === 'mobile' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            name="mobile"
                            placeholder={t('mobilePlaceholder')}
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseEnterMobile'),
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: t('invalidMobile'),
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
                            placeholder={t('captchaPlaceholder')}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${t('getCaptcha')}`;
                                }
                                return t('getCaptcha');
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseEnterCaptcha'),
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success(t('captchaSent'));
                            }}
                        />
                    </>
                )} */}
        </LoginForm>
      </div>
    </div>
  );
}

export default function LoginPage() {
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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LoginContent />
    </NextIntlClientProvider>
  );
}
