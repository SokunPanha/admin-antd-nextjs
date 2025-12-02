import type { ProSchemaValueEnumObj } from "@ant-design/pro-components";
import type { RangePickerProps } from "antd/es/date-picker";
import { useCallback, useState } from "react";
import cloneDeep from "lodash";
import { message } from "antd";
import { operationSuccessMessage } from "../hooks";
export const deepClone = cloneDeep;
// 匿名函数调用
export const callFn = <T>(fn: () => T) => fn();

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const disabledPastDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current.valueOf() < Date.now();
};

export const filterRequestParam = (params: any): any => {
  for (var propName in params) {
    if (
      params[propName] === null ||
      params[propName] === undefined 
      // params[propName] === ""
    ) {
      delete params[propName];
    }
  }
  return params;
};

export default function useToggle(defaultValue: boolean = false) {
  const [state, setState] = useState(defaultValue);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((prev) => !prev);
    }
  }, []);

  return [state, toggle] as const;
}

export const translateMappingObject = (
  params: ProSchemaValueEnumObj,
  name?: any,
  t?: (key: string) => string
): Record<string, any> => {
  if (!t) {
    return params as Record<string, any>;
  }

  for (let key in params) {
    if (name) {
      const item: any = params[key];
      params[key] = { text: t(item[name] as string), ...item };
    } else {
      const { text, ...other } = params[key] as { [x: string]: any };
      params[key] = { text: t(text as string), ...other };
    }
  }
  return params as Record<string, any>;
};

export function normalizeJSON(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.length === 1 ? obj[0] : obj.map(normalizeJSON);
  } else if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = normalizeJSON(obj[key]);
    }
    return newObj;
  }
  return obj;
}

export function useLocale() {
  const locale = localStorage.getItem("locale") == "zh" ? "zh" : "en";
  return { locale };
}

export function translateMapToSelectOption(
  array: { label: string; value: any }[],
  t: any
) {
  return array?.map((item) => ({ label: t(item.label), value: item.value }));
}


export function FormatRemoveTimeFromDate(date: string) {
  return date.split(" ")[0];
}

export const onCopy = async (text: string, t: (key: string) => string) => {
  try {
    await navigator.clipboard.writeText(text);
    message.destroy();
    message.success(t("copySuccess"));
  } catch (err) {
    message.destroy();
    message.error(t("copyFailed"));
  }
};

export function EnableCellCopy(key, t) {
  return (record: any) => ({
    onClick: () => onCopy(record[key], t),
    style: { cursor: "pointer" },
  });
}

export function useTheme() {
  const theme = localStorage.getItem("theme");
  return { theme };
}

export function decodeUnicode(str: string) {
  return str?.replace(/\\u003c/g, "").replace(/\\u003e/g, "");
}



export function useFetch<RequestType, SummaryResponseType>(FetchFunction: (params: RequestType)=> Promise<any>) {
  const [summary, setSummary] = useState<SummaryResponseType>();
  const [loading, setLoading] = useState(false);
  const request = async (params: RequestType) => {
    try {
      setLoading(true);
      const response = await FetchFunction(filterRequestParam(params));
      if (response?.extra) {
        setSummary(response.extra);
      }
      return {
        data: response.items ? response?.items : response?.list,
        total: response.total,
        success: true,
      };
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { request, summary, loading };
}

export function useMutationHandler<RequestType>(
  apiFunction: (params: RequestType) => Promise<any>,
  callback?: () => void,
  t?: (key: string) => string
) {
  return async (params: RequestType): Promise<void> => {
    try {
    if(params && Object.keys(params).length > 0){
        await apiFunction(filterRequestParam(params));
      if (t) {
        operationSuccessMessage(t);
      }
      callback?.();
    }
    } catch (error) {
      throw error;
    }
  };
}


// Helper function to convert string response to array
 export  const parseFilesToArray = (
    files: string | string[] | undefined
  ): string[] => {
    if (!files) return [];

    // If already an array, return as is
    if (Array.isArray(files)) return files;

    // If it's a string, try to parse it
    if (typeof files === "string") {
      // Handle empty string
      if (!files.trim()) return [];

      // Try to parse as JSON array first
      try {
        const parsed = JSON.parse(files);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // If JSON parsing fails, treat as comma-separated string
      }

      // Split by comma and clean up
      return files
        .split(",")
        .map((file) => file.trim())
        .filter((file) => file.length > 0);
    }

    return [];
  };