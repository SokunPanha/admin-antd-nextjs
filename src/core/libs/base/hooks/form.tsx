"use client"
import { Form, notification } from "antd";
import React, { useRef, useState, useEffect, type DependencyList } from "react";
import type { ProFormInstance } from "@ant-design/pro-form";
import { type ActionType } from "@ant-design/pro-components";
import { useTranslations } from "next-intl";

export const useProForm = () => {
  const formRef = useRef<ProFormInstance>(undefined);
  const [form] = Form.useForm();
  const ref = useRef({ row: undefined });
  const initialData = (data: any) => {
    if (!data) {
      form.resetFields();
    } else {
      //need to reset fields for make ProFormTreeSelect do request again when reopen the modalForm
      form.resetFields();
      form.setFieldsValue({ ...data });
    }
    ref.current.row = data;
  };

  const getData = () => {
    return ref.current.row;
  };

  return {
    getData,
    initialData,
    form: () => formRef.current,
    reset: () => formRef.current?.resetFields(),
    submit: () => formRef.current?.submit(),
    props: {
      formRef,
      form,
    },
  };
};

export const useForm = () => {
  const [form] = Form.useForm();
  return {
    form,
  };
};

export const useModalForm = () => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const ref = useRef({ row: undefined });

  const open = (data: any = undefined) => {
    setVisible(true);
    if (!data) {
      form.resetFields();
    } else {
      //need to reset fields for make ProFormTreeSelect do request again when reopen the modalForm
      form.resetFields();
      form.setFieldsValue(data);
    }
    ref.current.row = data;
  };

  const close = () => {
    setVisible(false);
  };

  const getData = (): any => {
    return ref.current.row;
  };

  return {
    open,
    getData,
    close,
    form,
    props: {
      submitter: {
        searchConfig: {
          submitText: t("label.confirm"),
        },
      },
      visible,
      onVisibleChange: setVisible,
      form,
      modalProps: {
        centered: true, // <-- centers the modal vertically
        destroyOnHidden: true,
        maskClosable: false,
      }
    },
  };
};

export const useDraw = () => {
  const [_open, setOpen] = useState(false);
  const ref = useRef<any>({ data: {} });
  const [dep, setDep] = useState(0);

  const open = (data: any = {}) => {
    ref.current.data = data;
    setOpen(true);
    setDep(dep + 1);
  };

  const close = () => {
    setOpen(false);
  };

  const useDrawEffect = (effect: () => void, deps: DependencyList = []) => {
    useEffect(() => {
      if (_open) {
        return effect();
      }
    }, [dep, ...deps]);
  };

  return {
    open,
    close,
    getData: () => ref.current.data,
    useDrawEffect,
    dep,
    props: {
      open: _open,
      onClose: () => setOpen(false),
      destroyOnHidden: true,
    },
  };
};

export const useDrawerForm = () => {
  const [form] = Form.useForm();
  const [_open, setOpen] = useState(false);
  const ref = useRef<any>({ data: {} });
  const [dep, setDep] = useState(0);

  const open = (data: any = {}) => {
    ref.current.data = data;
    setOpen(true);
    setDep(dep + 1);
    if (!data) {
      form.resetFields();
    } else {
      //need to reset fields for make ProFormTreeSelect do request again when reopen the modalForm
      form.resetFields();
      form.setFieldsValue(data);
    }
  };
  const close = () => {
    setOpen(false);
  };

  const useDrawEffect = (effect: () => void, deps: DependencyList = []) => {
    useEffect(() => {
      if (_open) {
        return effect();
      }
    }, [dep, ...deps]);
  };

  return {
    open,
    close,
    getData: () => ref.current.data,
    useDrawEffect,
    dep,
    props: {
      labelCol: { span: 6 },
      form,
      visible: _open,
      onVisibleChange: setOpen,
      drawerProps: {
        size: 900,
        maskClosable: false
      }
    },
  };
};

export const useProTable = () => {
  const t = useTranslations();
  const actionRef = useRef<ActionType | undefined>(undefined);
  const formRef = useRef<ProFormInstance>(undefined);
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchHeight, setSearchHeight] = useState(0);
  useEffect(() => {
    if (searchRef.current) {
      const searchEl = searchRef?.current.querySelector<HTMLDivElement>(".ant-pro-table-search ")
      if (searchEl) {
        setSearchHeight(searchEl.offsetHeight)
      }
    }
  }, [searchCollapsed]); // recalc when search collapses/expands
  const reload = () => {
    actionRef.current?.reload();
  };

  return {
    form: () => formRef.current,
    action: () => actionRef.current,
    reload,

    props: {
      rowClassName: (_: any, index: number) => (index % 2 === 0 ? "even-row" : "odd-row"),
      actionRef,
      formRef,
      scroll: { x: "max-content", y: `calc(100vh - ${searchHeight}px - 340px )` },
      pagination: {
        defaultPageSize: 100,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 40, 60, 80, 100, 200, 300],
      },
      cardProps: {
        className: " !bg-gray-50 dark:!bg-dark shadow-lg",
      },
      size: "small" as const,
      // bordered: true,
      searchFormRender: (props: any, defaultDom: any) => (
        <div ref={searchRef}>{defaultDom}</div>
      ),
      bordered: true,
      search: {
        labelWidth: "auto" as const,
        collapsed: searchCollapsed,
        collapseRender: (collapsed: boolean, onCollapse: any) => (
          <a
            onClick={() => {
              setSearchCollapsed(!collapsed);
            }}
            className="dark:text-blue-400 text-blue-700"
          >
            {collapsed ? t('more') : t('collapse')}
          </a>
        ),
        span: 6,
      },
    },
  };
};


export const useProTableForWithDrawPage = () => {
  const t = useTranslations();
  const actionRef = useRef<ActionType | undefined>(undefined);
  const formRef = useRef<ProFormInstance>(undefined);
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchHeight, setSearchHeight] = useState(0);
  useEffect(() => {
    if (searchRef.current) {
      const searchEl = searchRef?.current.querySelector<HTMLDivElement>(".ant-pro-table-search ")
      if (searchEl) {
        setSearchHeight(searchEl.offsetHeight)
      }
    }
  }, [searchCollapsed]); // recalc when search collapses/expands
  const reload = () => {
    actionRef.current?.reload();
  };

  return {
    form: () => formRef.current,
    action: () => actionRef.current,
    reload,

    props: {
      rowClassName: (_: any, index: number) => (index % 2 === 0 ? "even-row" : "odd-row"),
      actionRef,
      formRef,
      scroll: { x: "max-content", y: `calc(100vh - ${searchHeight}px - 340px )` },
      pagination: {
        defaultPageSize: 20,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 40, 60, 80, 100, 200, 300],
      },
      cardProps: {
        className: " !bg-gray-50 dark:!bg-dark shadow-lg",
      },
      size: "small" as const,
      // bordered: true,
      searchFormRender: (props: unknown, defaultDom: React.ReactNode) => (
        <div ref={searchRef}>{defaultDom}</div>
      ),
      bordered: true,
      search: {
        labelWidth: "auto" as const,
        collapsed: searchCollapsed,
        collapseRender: (collapsed: boolean, onCollapse: unknown) => (
          <a
            onClick={() => {
              setSearchCollapsed(!collapsed);
            }}
            className="dark:text-blue-400 text-blue-700"
          >
            {collapsed ? t('more') : t('collapse')}
          </a>
        ),
        span: 6,
      },
    },
  };
};

export const useProTableWith500PageSize = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const formRef = useRef<ProFormInstance>(undefined);
  const reload = () => {
    actionRef.current?.reload();
  };

  return {
    form: () => formRef.current,
    action: () => actionRef.current,
    reload,
    props: {
      actionRef,
      formRef,
      scroll: { x: "max-content" },
      pagination: {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100, 500],
      },
    },
  };
};
export const useModal = () => {
  const [_open, setOpen] = useState(false);
  const ref = useRef<any>({ data: {} });

  const open = (data: any = {}) => {
    setOpen(true);
    ref.current.data = data;
  };

  return {
    open,
    getData: () => ref.current.data,
    props: {
      open: _open,
      onCancel: () => setOpen(false),
    },
  };
};

export function usePasteValueOnFocus() {
  return {
    fieldProps: {
      onFocus: async (e: any) => {
        try {
          const text = await navigator.clipboard.readText();
          e.target.value = text;
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
}




export const operationSuccessMessage = (t: (key: string) => string) => {
  notification.destroy()
  notification.success({
    message: t("operationSuccess"),
    title: undefined
  });
}