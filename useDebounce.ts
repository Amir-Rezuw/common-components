import { useEffect, useState } from "react";

const useDebouncedValue = <T>(usersValue: T, delay: number): T => {
  const [value, setValue] = useState(usersValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValue(usersValue);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [usersValue]);
  return value;
};
export { useDebouncedValue };
