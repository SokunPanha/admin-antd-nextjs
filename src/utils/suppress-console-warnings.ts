// Suppress Ant Design React 19 compatibility warning
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('[antd: compatible]')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}
