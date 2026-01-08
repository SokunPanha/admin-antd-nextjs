"use client";

import RolesPage from '@/components/Page/Center/Roles';
import { RolesPageProvider } from '@/components/Page/Center/Roles/helper/hooks';

export default function Page() {
  return (
    <RolesPageProvider>
      <RolesPage />
    </RolesPageProvider>
  );
}
