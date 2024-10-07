import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const handleSearchResults = (searchResults: any[]) => {
    setMovies(searchResults);
  };

  return (
    <BrowserRouter>
      <Header onSearchResults={handleSearchResults} />
      <div className="container p-5"></div>
    </BrowserRouter>
  );
}

export default App;
