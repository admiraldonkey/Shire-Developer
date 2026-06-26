const ENABLE_DEV_LOGS = true;

export function devLog(...args: unknown[]) {
  if (import.meta.env.DEV && ENABLE_DEV_LOGS) {
    console.log(...args);
  }
}
