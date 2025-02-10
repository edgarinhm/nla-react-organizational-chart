import { API_URL } from "../constants/env-constants";
import { DivisionUrl } from "./api-routes";

export const GetDivisions = async (signal) => {
  const response = await fetch(`${API_URL}${DivisionUrl.get()}`, { signal });
  const { data } = await response.json();
  return data;
};
