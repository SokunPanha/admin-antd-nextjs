'use client';

import { message as antMessage, notification, App } from 'antd';
import { NetworkError } from './index';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import React from 'react';


interface ErrorHandlerConfig {
  showNotification?: boolean;
  showMessage?: boolean;
  onAuthError?: () => void;
  onValidationError?: (errors: string[]) => void;
}

export class ErrorHandler {
  private messageApi: MessageInstance;
  private notificationApi: NotificationInstance;
  private static isRedirecting = false;

  constructor(messageApi?: MessageInstance, notificationApi?: NotificationInstance) {
    this.messageApi = messageApi || antMessage;
    this.notificationApi = notificationApi || notification;
  }

  handle(error: unknown, config: ErrorHandlerConfig = {}) {
    const {
      showNotification = true,
      showMessage = false,
      onAuthError,
      onValidationError,
    } = config;

    if (error instanceof NetworkError) {
      this.handleNetworkError(error, {
        showNotification,
        showMessage,
        onAuthError,
        onValidationError,
      });
    } else if (error instanceof Error) {
      this.handleGenericError(error, showNotification, showMessage);
    } else {
      this.handleUnknownError(showNotification, showMessage);
    }
  }

  private handleNetworkError(
    error: NetworkError,
    config: ErrorHandlerConfig
  ) {
    const { showNotification, showMessage, onAuthError, onValidationError } = config;

    // Handle 401 Unauthorized - redirect to login
    if (error.status === 401) {
      // Prevent redirect loop - if already redirecting or on login page, just show error
      if (ErrorHandler.isRedirecting || window.location.pathname === '/login') {
        if (showMessage) {
          this.messageApi.error(error.message);
        }
        return;
      }

      // Show user-friendly notification
      if (showNotification) {
        this.notificationApi.warning({
          message: 'Session Expired',
          description: error.message || 'Please login again to continue.',
          duration: 3,
        } as any);
      }

      if (showMessage) {
        this.messageApi.error(error.message);
      }

      if (onAuthError) {
        onAuthError();
      } else {
        // Mark that we're redirecting to prevent loops
        ErrorHandler.isRedirecting = true;

        // Clear authentication cookies via logout API and redirect
        this.clearAuthAndRedirect();
      }
      return;
    }

    // Handle 422 Validation errors
    if (error.status === 422) {
      if (showNotification) {
        this.notificationApi.error({
          message: 'Validation Error',
          description: error.message,
          duration: 5,
        } as any);
      }

      if (onValidationError) {
        onValidationError([error.message]);
      }
      return;
    }

    // Handle 403 Forbidden
    if (error.status === 403) {
      if (showNotification) {
        this.notificationApi.error({
          message: 'Permission Denied',
          description: error.message,
          duration: 4,
        } as any);
      }
      return;
    }

    // Handle 404 Not Found
    if (error.status === 404) {
      if (showNotification) {
        this.notificationApi.warning({
          message: 'Not Found',
          description: error.message,
          duration: 4,
        } as any);
      }
      return;
    }

    // Handle 409 Conflict
    if (error.status === 409) {
      if (showNotification) {
        this.notificationApi.warning({
          message: 'Conflict',
          description: error.message,
          duration: 4,
        } as any);
      }
      return;
    }

    // Handle 500 Server Error
    if (error.status === 500) {
      if (showNotification) {
        this.notificationApi.error({
          message: 'Server Error',
          description: error.message,
          duration: 4,
        } as any);
      }
      return;
    }

    // Handle other errors
    if (showNotification) {
      this.notificationApi.error({
        message: 'Error',
        description: error.message,
        duration: 4,
      } as any);
    }

    if (showMessage) {
      this.messageApi.error(error.message);
    }
  }

  private handleGenericError(error: Error, showNotification: boolean, showMessage: boolean) {
    const errorMessage = `${error.name}: ${error.message}`;

    if (showNotification) {
      this.notificationApi.error({
        message: 'Error',
        description: errorMessage,
        duration: 4,
      } as any);
    }

    if (showMessage) {
      this.messageApi.error(errorMessage);
    }
  }

  private handleUnknownError(showNotification: boolean, showMessage: boolean) {
    const errorMessage = 'An unknown error occurred';

    if (showNotification) {
      this.notificationApi.error({
        message: 'Error',
        description: errorMessage,
        duration: 4,
      } as any);
    }

    if (showMessage) {
      this.messageApi.error(errorMessage);
    }
  }

  private async clearAuthAndRedirect(): Promise<void> {
    try {
      // Call logout API to clear cookies server-side
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error clearing auth cookies:', error);
    } finally {
      // Redirect to login after a short delay (to show notification)
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }
}

// Helper hook for using error handler in components
export function useErrorHandler() {
  const { message: messageApi, notification: notificationApi } = App.useApp();
  return new ErrorHandler(messageApi, notificationApi);
}
