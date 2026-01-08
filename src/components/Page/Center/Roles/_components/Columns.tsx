import { defineColumns } from "@/core/libs/base";
import { Tag, Switch, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

export default function Columns(
  t: (key: string) => string,
  context: ReturnType<typeof import("../helper/hooks").useRolesPageContext>,
  deleteRole: (record: { id: number }) => void,
  updateRoleStatus: (params: { id: number; status: string }) => void,
  openAssignMenus: (record: any) => void
) {

  return defineColumns([
    {
      title: t("tableColumn.id"),
      dataIndex: "id",
      search: false,
      width: 80,
    },
    {
      title: t("tableColumn.name"),
      dataIndex: "name",
      search: true,
      copyable: true,
    },
    {
      title: t("tableColumn.code"),
      dataIndex: "code",
      search: true,
      copyable: true,
    },
    {
      title: t("tableColumn.description"),
      dataIndex: "description",
      search: false,
      ellipsis: true,
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
      title: t("tableColumn.active"),
      dataIndex: "status",
      search: false,
      width: 100,
      render: (_: any, record: any) => (
        <Switch
          checked={record.status === "active"}
          onChange={(checked) => updateRoleStatus({ id: record.id, status: checked ? "active" : "inactive" })}
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
      width: 160,
      render: (record: any) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              size="small"
              icon={<AiOutlineMenu />}
              onClick={() => openAssignMenus(record)}
            >
              {t('button.assignMenus')}
            </Button>
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
              onClick={() => deleteRole({ id: record.id })}
              size={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ]);
}
