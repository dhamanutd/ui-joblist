import Cookies from "js-cookie";

export const getCookies = (key: string) => {
  const auth = Cookies.get(key) || "";
  return auth;
};

export const setCookies = (key: string, value: string) => {
  Cookies.set(key, value, { secure: true });
};
