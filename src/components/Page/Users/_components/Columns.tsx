import { defineColumns } from "@/core/libs/base";
import { Image } from "antd";
import { BiEdit } from "react-icons/bi";
import { useUsersPageContext } from "../helper/hooks";

export default function Columns(t: (key: string) => string) {
  const context = useUsersPageContext()
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
    },
    {
      title: t("tableColumn.avatar"),
      dataIndex: "avatar",
      search: false,
      width: 120,
      render: (avatar: unknown) => {
        return (
          <Image src={avatar as string} alt="avatar" width={60} height={60} style={{ borderRadius: '50%' }} />
        );
      },
    },
    {
      title: t("tableColumn.country"),
      dataIndex: "country",
      search: true,
    },
    {
      title: t("tableColumn.cityname"),
      dataIndex: "cityname",
      search: true,
    },
    {
      title: t("tableColumn.created_at"),
      dataIndex: "createdAt",
      search: false,
    },
    {
      title: t("tableColumn.action"),
      search: false,
      width: 80,
      render: (record: any) => {
        return (
          <div>
            <BiEdit color="orange" onClick={() => {
              context.updateForm.open(record)
            }} size={20} style={{ cursor: 'pointer' }}/>
          </div>
        )
      }
    },
  ]);
}
