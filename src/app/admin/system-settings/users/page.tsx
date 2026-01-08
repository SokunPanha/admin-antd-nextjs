"use client";

import UsersPage from '@/components/Page/Center/Users';
import { UsersPageProvider } from '@/components/Page/Center/Users/helper/hooks';

export default function Page() {
  return (
    <UsersPageProvider>
      <UsersPage />
    </UsersPageProvider>
  );
}
