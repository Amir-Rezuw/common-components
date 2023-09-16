import { MutableRefObject, useEffect } from "react";

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  exceptionId?: string
) => {
  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(target as HTMLElement) &&
        (target as HTMLElement).id !== exceptionId
      ) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
