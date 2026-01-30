import { useEffect, useState } from "react";

// defaultValue defaults to "list" if not provided
export function useStoredViewMode(componentKey, defaultValue = "list") {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem("viewMode");
      const parsed = stored ? JSON.parse(stored) : {};
      return parsed[componentKey] || defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("viewMode");
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[componentKey] = value; // set only this component's value
      localStorage.setItem("viewMode", JSON.stringify(parsed));
    } catch {}
  }, [componentKey, value]);

  return [value, setValue];
}