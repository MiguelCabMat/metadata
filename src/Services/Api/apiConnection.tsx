import axios, { AxiosResponse } from "axios";

const apiUrl: string = "https://www.omdbapi.com/";

export const fetchData = async <T,>(
  params: Record<string, string | undefined>
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get<T>(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
