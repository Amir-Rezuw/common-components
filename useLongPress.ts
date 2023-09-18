import { MutableRefObject, useCallback } from "react";

const useLongPress = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  delay: number
) => {
  let timerId: number;
  const onMouseDown = useCallback(() => {
    timerId = setTimeout(() => {
      callback();
    }, delay);
  }, []);
  ref.current?.addEventListener("mousedown", onMouseDown);

  ref.current?.addEventListener("mouseup", () => {
    if (timerId) {
      clearTimeout(timerId);
    }
  });
};

export default useLongPress;
