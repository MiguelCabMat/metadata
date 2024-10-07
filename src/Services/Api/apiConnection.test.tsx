import axios from "axios";
import { fetchData } from "./apiConnection";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("apiConnection service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data from API", async () => {
    const mockData = { Search: [], totalResults: "0", Response: "True" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const params = {
      s: "batman",
      apiKey: process.env.REACT_APP_OMDB_API,
    };

    const data = await fetchData(params);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith({ params });
    expect(data).toEqual(mockData);
  });

  it("should throw an error if the fetch fails", async () => {
    const mockData = { Response: "False", Error: "Too many results." };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const url = "https://www.omdbapi.com";
    const params = {
      s: "b",
      apiKey: process.env.REACT_APP_OMDB_API,
    };

    const data = await fetchData(params);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockData);
  });
});
