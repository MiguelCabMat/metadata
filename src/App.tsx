import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Favorites from "./Components/Favorites/Favorites";
import Movie from "./Components/Movie/Movie";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const handleSearchResults = (searchResults: any[]) => {
    setMovies(searchResults);
  };

  return (
    <BrowserRouter>
      <Header onSearchResults={handleSearchResults} />
      <div className="container p-5">
        <Routes>
          <Route
            path="/"
            element={
              <Home movies={movies} onSearchResults={handleSearchResults} />
            }
          />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
