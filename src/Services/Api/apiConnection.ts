import axios from "axios";

// https:www.omdbapi.com/?s=Batman&page=1&apikey=x
export const fetchData = async <T>(
  url: string,
  params: Record<string, string | undefined>
): Promise<T> => {
  try {
    const response: any = await axios.get(url, {
      params: { params },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
