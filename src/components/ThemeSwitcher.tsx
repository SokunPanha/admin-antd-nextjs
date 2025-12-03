"use client";

import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      style={{
        cursor: "pointer",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s",
      }}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <BulbFilled style={{ color: "#ffd700" }} />
      ) : (
        <BulbOutlined style={{ color: "#666" }} />
      )}
    </div>
  );
}
