import { defineColumns } from "@/core/libs/base";
import { Tag, Switch } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function Columns(
  t: (key: string) => string,
  context: ReturnType<typeof import("../helper/hooks").useMenusPageContext>,
  deleteMenu: (record: { id: number }) => void,
  updateMenuStatus: (params: { id: number; status: string }) => void
) {

  return defineColumns([
    {
      title: t("tableColumn.id"),
      dataIndex: "id",
      search: false,
      width: 80,
    },
    {
      title: t("tableColumn.code"),
      dataIndex: "filters.code",
      search: true,
      copyable: true,
    },
    {
      title: t("tableColumn.label"),
      dataIndex: "labels",
      search: true,
      render: (_: any, record: any) => {
        return record.labels?.en ;
      },
    },
    {
      title: t("tableColumn.icon"),
      dataIndex: "icon",
      search: false,
      width: 100,
    },
    {
      title: t("tableColumn.path"),
      dataIndex: "route_path",
      search: false,
      copyable: true,
    },
    {
      title: t("tableColumn.sortOrder"),
      dataIndex: "sort_order",
      search: false,
      width: 100,
      sorter: true,
    },
    {
      title: t("tableColumn.status"),
      dataIndex: "status",
      search: false,
      width: 100,
      render: (_: any, record: any) => (
        <Tag color={record.status === "active" ? "green" : "red"}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: t("tableColumn.visible"),
      dataIndex: "is_visible",
      search: false,
      width: 100,
      render: (_: any, record: any) => (
        <Switch
          checked={record.status === "active"}
          onChange={(checked) => updateMenuStatus({ id: record.id, status: checked ? "active" : "inactive" })}
        />
      ),
    },
    {
      title: t("tableColumn.createdAt"),
      dataIndex: "created_at",
      search: false,
      valueType: "dateTime",
    },
    {
      title: t("tableColumn.action"),
      search: false,
      width: 120,
      render: (record: any) => {
        return (
          <div className="flex gap-2">
            <BiEdit
              color="orange"
              onClick={() => {
                context.updateForm.open(record);
              }}
              size={20}
              className="cursor-pointer"
            />
            <MdDelete
              color="red"
              onClick={() => deleteMenu({ id: record.id })}
              size={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ]);
}
