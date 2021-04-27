export const isNotEmptyObject = (object) =>
  Object.values(object).every((item) => Boolean(item));
