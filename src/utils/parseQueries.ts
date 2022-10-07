export const parseQueries = (parameters: any) => {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      if (value) {
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1);
  }
  return `?${qs}`;
};
