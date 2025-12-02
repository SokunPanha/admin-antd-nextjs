import React from "react";
import { Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

type ViewDetailsButtonProps = {
  onClick: () => void;
  size?: number; // optional size for the icon
};

export const ViewDetailsButton = ({ onClick, size = 16 }: ViewDetailsButtonProps) => {
  const t = useTranslations();

  return (
    <Tooltip title={t("label:label.view_details")}>
      <span
        onClick={onClick}
        className="flex items-center justify-center w-8 h-8 rounded-md 
                   bg-gray-100 text-gray-700 
                   dark:bg-gray-800 dark:text-gray-200
                   cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 
                   transition-colors duration-200"
      >
        <EyeOutlined style={{ fontSize: size }} />
      </span>
    </Tooltip>
  );
};