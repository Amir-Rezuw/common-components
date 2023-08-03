export const addCommas = (digit: string | number) => {
  const numericValue = +digit;
  return numericValue.toLocaleString();
};
export const persianToEN = (digit: string | number) => {
  return digit
    .toString()
    .replace(/[۰-۹]/g, (item) => "۰۱۲۳۴۵۶۷۸۹".indexOf(item).toString());
};
export function randomNumber({ from, to }: { from: number; to: number }) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
