"use client";

import { Spin } from "antd";

export default function LoadingState() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" tip="Loading menu...">
        <div style={{ padding: 50 }} />
      </Spin>
    </div>
  );
}
