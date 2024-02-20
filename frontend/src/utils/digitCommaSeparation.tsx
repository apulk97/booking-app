export const addCommaToCurrency = (currency: number | null | undefined): string => {
  const currString = currency?.toString() ?? "";
  const decimalPart = currString.includes(".") ? currString.split(".")[1] : "";
  let integerPart = decimalPart ? currString.split(".")[0] : currString;
  const formattedIntegerPart = integerPart
    .split("")
    .reverse()
    .reduce((acc, item, ind, arr) => {
      if (ind % 2 === 0 && ind !== 0 && arr.length - 1 !== ind) {
        acc.push(item);
        acc.push(",");
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as string[])
    .reverse()
    .join("");
  return decimalPart
    ? formattedIntegerPart + "." + decimalPart
    : formattedIntegerPart;
};
