export type SearchParamsType = {
  [key: string]: string | null;
};

export function getSearchWith(
  paramsToUpd: SearchParamsType,
  search?: string | URLSearchParams
) {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpd).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
