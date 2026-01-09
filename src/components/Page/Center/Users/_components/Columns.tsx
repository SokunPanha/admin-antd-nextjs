import { defineColumns } from "@/core/libs/base";
import { Tag, Switch, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Columns(
  t: (key: string) => string,
  context: ReturnType<typeof import("../helper/hooks").useUsersPageContext>,
  deleteUser: (record: { id: number }) => void,
  updateUserStatus: (params: { id: number; status: string }) => void,
  openAssignRoles: (record: any) => void,
  openUpdatePassword: (record: any) => void
) {

  return defineColumns([
    {
      title: t("tableColumn.id"),
      dataIndex: "id",
      search: false,
      width: 80,
    },
    {
      title: t("tableColumn.username"),
      dataIndex: "username",
      search: true,
      copyable: true,
    },
    {
      title: t("tableColumn.email"),
      dataIndex: "email",
      search: true,
      copyable: true,
    },
    {
      title: t("tableColumn.firstName"),
      dataIndex: "first_name",
      search: true,
    },
    {
      title: t("tableColumn.lastName"),
      dataIndex: "last_name",
      search: true,
    },
    {
      title: t("tableColumn.phoneNumber"),
      dataIndex: "phone_number",
      search: false,
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
          onChange={(checked) => updateUserStatus({ id: record.id, status: checked ? "active" : "inactive" })}
        />
      ),
    },
    {
      title: t("tableColumn.lastLoginAt"),
      dataIndex: "last_login_at",
      search: false,
      valueType: "dateTime",
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
      width: 220,
      render: (record: any) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              size="small"
              icon={<AiOutlineUserSwitch />}
              onClick={() => openAssignRoles(record)}
            >
              {t('button.assignRoles')}
            </Button>
            <RiLockPasswordLine
              color="blue"
              onClick={() => openUpdatePassword(record)}
              size={20}
              className="cursor-pointer"
              title={t('button.updatePassword')}
            />
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
              onClick={() => deleteUser({ id: record.id })}
              size={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ]);
}
