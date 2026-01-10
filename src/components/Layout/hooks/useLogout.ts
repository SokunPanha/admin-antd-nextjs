"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";

export function useLogout() {
  const router = useRouter();
  const { message } = App.useApp();

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        message.success('Logout successful!');
        router.push('/login');
      } else {
        message.error(data.message || 'Logout failed!');
      }
    } catch (error) {
      message.error('An error occurred during logout');
    }
  }, [message, router]);

  return handleLogout;
}
