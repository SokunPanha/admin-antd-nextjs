'use client';

import { Alert } from 'antd';

interface FormErrorsProps {
  errors: string[];
  onClose?: () => void;
}

export function FormErrors({ errors, onClose }: FormErrorsProps) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <Alert
      message="Validation Errors"
      description={
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      }
      type="error"
      closable={!!onClose}
      onClose={onClose}
      style={{ marginBottom: 16 }}
    />
  );
}
