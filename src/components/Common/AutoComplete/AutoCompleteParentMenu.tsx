import { ProFormSelect } from '@ant-design/pro-components';
import { SystemSettingMenusParentMenuMasterdataApiV1 } from '@/core/services/api';
import { useTranslations } from 'next-intl';

interface AutoCompleteParentMenuProps {
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function AutoCompleteParentMenu({
  name = 'parent_id',
  label,
  placeholder,
  disabled = false,
  required = false,
}: AutoCompleteParentMenuProps) {
  const t = useTranslations();

  return (
    <ProFormSelect
      name={name}
      label={label || t('label.parentMenu')}
      placeholder={placeholder || t('label.selectParentMenu')}
      disabled={disabled}
      rules={required ? [{ required: true, message: t('validation.required') }] : []}
      request={async () => {
        try {
          const res = await SystemSettingMenusParentMenuMasterdataApiV1({
            status: 'active'
          });

          // Add "No Parent" option at the beginning
          const options = [
            {
              label: t('label.noParent'),
              value: 0,
            },
            ...res.items.map((item) => ({
              label: item.label,
              value: item.id,
            })),
          ];

          return options;
        } catch (error) {
          console.error('Failed to fetch parent menu options:', error);
          return [
            {
              label: t('label.noParent'),
              value: 0,
            },
          ];
        }
      }}
      fieldProps={{
        showSearch: true,
        filterOption: (input: string, option: any) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
      }}
    />
  );
}
