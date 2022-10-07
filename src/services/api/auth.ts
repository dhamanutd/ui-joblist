import Axios from "../../utils/axios";
export const login = async (username: string, password: string) => {
  try {
    return await Axios.post(`/login`, {
      email: username,
      password: password,
    });
  } catch (error: any) {
    return error.response;
  }
};
