import { defineColumns } from "@/core/libs/base";
import { Image } from "antd";
import { useTranslations } from "next-intl";

export default function Columns() {
  const t = useTranslations();
  return defineColumns([
    {
      title: t("tableColumn.id"),
      dataIndex: "id",
      search: false,
    },
    
    {
      title: t("tableColumn.name"),
      dataIndex: "name",
      search: true,
    },
   
    {
      title: t("tableColumn.price"),
      dataIndex: "price",
      search: false,
    },
     {
      title: t("tableColumn.image"),
      dataIndex: "image",
      search: false,
      render: (image: unknown) => {
        return <Image src={image as string} alt="test" width={100} height={100} />;
      },
    },
     {
      title: t("tableColumn.created_at"),
      dataIndex: "createdAt",
      search: false,
    },
  ]);
}
