import { defineColumns } from "@/core/libs/base";
import { Image } from "antd";
import { BiEdit } from "react-icons/bi";
import { useProductsPageContext } from "../helper/hooks";

export default function Columns(t: (key: string) => string) {
  const context = useProductsPageContext()
  // const t = useTranslations();
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
        return (
          <Image src={image as string} alt="test" width={100} height={100} />
        );
      },
    },
    {
      title: t("tableColumn.created_at"),
      dataIndex: "createdAt",
      search: false,
    },
    {
      title: t("tableColumn.action"),
      search: false, 
      render: (record: any)=>{
        return (
          <div>
            <BiEdit color="orange" onClick={()=> {
              context.updateForm.open(record)
            }} size={20}/>
          </div>
        )
      }
    },
  ]);
}
