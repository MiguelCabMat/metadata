import axios from "axios";
import { fetchData } from "./apiConnection";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("apiConnection service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data from API", async () => {
    const url = "https://www.omdbapi.com";
    const params = {
      s: "batman",
      apiKey: process.env.REACT_APP_OMDB_API,
    };

    mockedAxios.get.mockResolvedValue({
      data: {
        Search: [
          {
            Title: "Batman Begins",
            Year: "2005",
            imdbID: "tt0372784",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          },
        ],
        totalResults: "575",
        Response: "True",
      },
    });

    const data = await fetchData(url, params);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(url, { params });
    expect(data).toEqual({
      Search: [
        {
          Title: "Batman Begins",
          Year: "2005",
          imdbID: "tt0372784",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        },
      ],
      totalResults: "575",
      Response: "True",
    });
  });

  it("should throw an error if the fetch fails", async () => {
    const url = "https://www.omdbapi.com";
    const params = {
      s: "b",
      apiKey: process.env.REACT_APP_OMDB_API,
    };

    mockedAxios.get.mockResolvedValue({
      data: {
        Response: "False",
        Error: "Too many results",
      },
    });

    const data = await fetchData(url, params);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data).toEqual({
      Response: "False",
      Error: "Too many results.",
    });
  });
});
