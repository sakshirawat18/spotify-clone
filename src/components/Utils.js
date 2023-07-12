export const is_empty = (value) => {
  return (
    typeof value === "undefined" ||
    value === null ||
    value === "" ||
    value.length === 0 ||
    value === 0 ||
    value === false
  );
};
