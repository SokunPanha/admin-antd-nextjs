import { message, notification } from "antd";
// import { getEnvironment } from "../config";
import type { RequestData } from "@ant-design/pro-components";
import type { SortOrder } from "antd/es/table/interface";
import getEnvironment from "../config";
// import { getCurrentUser, clearCurrentUser, getCurrentRouter } from "../components/center";

const failStatusMap: { [key: number]: string } = {
  504: "网关超时",
  404: "请求地址不存在",
};

export class NetworkError extends Error {
  code: string;
  message: string;
  status: number;

  constructor(code: string, msg: string, status: number) {
    super(msg);
    this.code = code;
    this.message = msg;
    this.status = status;
  }
}

// type = 1  'application/json'
// type = 2  upload file
export const createApi =
  <T, R>(path: string) =>
  async (data: T, type = 1) => {
   const response = await fetch('/api/proxy' + path, {
    method: 'POST',
    body: JSON.stringify(data),
    // credentials: "include"
   })

   if(response.status === 201){
    return (await response.json()).data as R
   }

   
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
    if (e.code) {
      return `[${e.code}]${e.message}`;
    }
    return e.message;
  }

  if (e instanceof Error) {
    return `${e.name}: ${e.message}`;
  }
  return "未知错误";
}

// form submit wrapper with sync
export const formSubmitWrap =
  <T>(fn: (value: unknown) => void, finallyFunc: () => void = () => {}) =>
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
export const tableRequestWrap =
  (
    fn: (
      params: { pageSize?: number; current?: number; [keyword: string]: unknown },
      sort: Record<string, SortOrder>,
      filter: Record<string, (string | number)[] | null>
    ) => void
  ) =>
  async <T>(
    params: { pageSize?: number; current?: number; keyword?: string },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>
  ): Promise<Partial<RequestData<T>>> => {
    return await sync(
      async (): Promise<unknown> => {
        return fn({...params,page_size: params.pageSize, page: params.current, }, sort, filter);
      },
      { loading: false }
    );
  };
