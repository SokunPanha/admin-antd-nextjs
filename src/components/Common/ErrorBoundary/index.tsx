'use client';

import React, { Component, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <Result
            status="error"
            title="Something went wrong"
            subTitle={
              process.env.NODE_ENV === 'development'
                ? this.state.error?.message
                : 'An unexpected error occurred. Please try refreshing the page.'
            }
            extra={[
              <Button
                type="primary"
                key="reload"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>,
              <Button key="home" onClick={() => (window.location.href = '/admin')}>
                Go Home
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
