import Axios from "../../utils/axios";
import { parseQueries } from "../../utils/parseQueries";

export const getRecruitments = async (
  queries: Map<string, string | number | boolean>
) => {
  const q = parseQueries(Object.fromEntries(queries));
  try {
    return await Axios.get(`/recruitment/positions${q}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getRecruitment = async (id: string) => {
  try {
    return await Axios.get(`/recruitment/positions/${id}`);
  } catch (error: any) {
    return error.response;
  }
};
