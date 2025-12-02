import { Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { FiEdit } from "react-icons/fi";

type EditButtonProps = {
  onClick?: () => void;
};

export const EditButton = ({ onClick }: EditButtonProps) => {
  const t = useTranslations();

  return (
    <Tooltip title={t("label:label.edit")}>
      <span
        onClick={onClick}
        className="flex items-center justify-center w-8 h-8 rounded-md 
                   bg-orange-100 text-orange-600 dark:bg-orange-700 dark:text-orange-200 
                   cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-600 
                   transition-all duration-200"
      >
        <FiEdit size={16} />
      </span>
    </Tooltip>
  );
};