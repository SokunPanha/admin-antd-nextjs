import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";

type propCom = {
  onClick?: ()=> void;
};

export const AddButton = ({ onClick }: propCom) => {
  const t = useTranslations();

  return (
    <Button
      icon={<PlusOutlined />}
      type={"primary"}
      className="flex items-center"
      onClick={onClick}
    >
      {t("label.addNew")}
    </Button>
  );
};
