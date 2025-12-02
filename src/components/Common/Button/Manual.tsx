import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";

type propCom = {
  onClick?: () => void;
};

export const ManualButton = ({ onClick }: propCom) => {
  const t = useTranslations();

  return (
    <Button
    icon={<PlusCircleOutlined/>}
      type={"primary"}
      className="flex items-center"
      onClick={onClick}
    >
      {t("label:label.manualAdd")}
    </Button>
  );
};
