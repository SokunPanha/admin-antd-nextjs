"use client";

import { Alert, Button } from "antd";

interface ErrorStateProps {
  error?: string | null;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Alert
        title="Failed to Load Menu"
        description={error || "Could not load menu data from API"}
        type="error"
        showIcon
        action={
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        }
      />
    </main>
  );
}
