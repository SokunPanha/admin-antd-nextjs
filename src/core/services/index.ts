import { message, notification } from "antd";
import type { RequestData } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";
import getEnvironment from "../config";
import { ErrorHandler } from "./error-handler";

const failStatusMap: { [key: number]: string } = {
  504: "网关超时",
  404: "请求地址不存在",
};

export class NetworkError extends Error {
  message: string;
  status: number;

  constructor(msg: string, status: number) {
    super(msg);
    this.message = msg;
    this.status = status;
  }
}

// type = 1  'application/json'
// type = 2  upload file
export const createApi =
  <T, R>(path: string) =>
    async (data: T, type = 1): Promise<R> => {
      const response = await fetch('/api/proxy' + path, {
        method: 'POST',
        body: JSON.stringify(data),
        // credentials: "include"
      })

      if (response.status === 201) {
        return (await response.json()).data as R
      }

      // Handle error cases
      if (!response.ok) {
        // Try to parse error response body
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If JSON parsing fails, use default error message
          const errorMsg = failStatusMap[response.status] || `Request failed (${response.status})`;
          throw new NetworkError(errorMsg, response.status);
        }

        // Extract message from backend response
        const message = errorData.message || failStatusMap[response.status] || `Request failed (${response.status})`;

        throw new NetworkError(message, response.status);
      }

      // For other successful status codes
      return (await response.json()).data as R;
    };

export const sync = async (fn: () => Promise<any>, { loading = true } = {}) => {
  let close;
  if (loading) {
    close = message.loading({
      content: "加载中...",
      duration: 0,
    });
  }
  try {
    const res = await fn();
    if (close) {
      close();
    }
    return res;
  } catch (e) {
    console.log("sync error", e);
    if (close) {
      close();
    }

    // Use centralized error handler
    const errorHandler = new ErrorHandler();
    errorHandler.handle(e, {
      showNotification: true,
      showMessage: false,
    });
  }
};
export const syncWithErrorHandleFunc = async (fn: () => Promise<never>, errFunc: () => void) => {
  try {
    const res = await fn();
    return res;
  } catch (e) {
    console.log("sync error", e);
    errFunc();
    const msg = getErrMsg(e);
    if (e instanceof NetworkError) {
      // todo
    }
    notification.error({
      message: "提示",
      description: msg,
      title: undefined
    });
  }
};

export const syncFn = <T extends (...args: unknown[]) => unknown>(fn: T): T => {
  const call = (...args: Parameters<T>): Promise<ReturnType<T>> =>
    sync(async () => {
      return await fn(...args);
    });
  return call as T;
};

function getErrMsg(e: unknown): string {
  console.log("error ==== hllo === ", e);

  if (typeof e === "string") {
    return e;
  }
  if (e instanceof NetworkError) {
    return e.message;
  }

  if (e instanceof Error) {
    return `${e.name}: ${e.message}`;
  }
  return "未知错误";
}

// form submit wrapper with sync
export const formSubmitWrap =
  <T>(fn: (value: T) => Promise<void>, finallyFunc: () => void = () => { }) =>
    async (formData: T): Promise<boolean | void> => {
      let isSuccess = false;
      await sync(
        async () => {
          try {
            await fn(formData);
            isSuccess = true;
          } finally {
            if (finallyFunc) {
              finallyFunc();
            }
          }
        },
        { loading: false }
      );
      return isSuccess;
    };

// pro table request wrapper with sync
export const tableRequestWrap = <T = any>(
  fn: (params: any) => Promise<{ data: T[]; total: number; success: boolean }>
) =>
  async (
    params: { pageSize?: number; current?: number; keyword?: string },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>
  ): Promise<RequestData<T>> => {
    return await sync(
      async () => {
        const { pageSize, current, ...restParams } = params;
        return fn({
          ...restParams,
          page_size: pageSize || 10,
          page: current || 1,
          sort,
        });
      },
      { loading: false }
    );
  };
