import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import "./Home.css";
import Filter from "./Filter/Filter";

interface HomeProps {
  movies: any[];
  onSearchResults: (movies: any[]) => void;
}

const Home: React.FC<HomeProps> = ({ movies, onSearchResults }) => {
  const [selectedType, setSelectedType] = useState<string>("movie");

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => movie.Type === selectedType);

  if (movies.length === 0) {
    return (
      <Alert key="warning" variant="warning">
        <Alert.Heading>¡Bienvenido!</Alert.Heading>
        <p>
          Lamentablemente no puedo mostrar todo el catálogo de películas o
          series.
        </p>
        <hr />
        <div className="d-flex align-items-center">
          Así que dime, ¿qué película o serie quieres ver?
          <span className="m-2">
            <SearchBar onSearch={onSearchResults} />
          </span>
        </div>
      </Alert>
    );
  }

  return (
    <>
      <Filter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <div className="row mt-5">
        <p className="text-muted">
          Mostrando <span className="text-danger font-weight-bold">{filteredMovies.length}</span> 
          {selectedType === "movie" ? " película(s)" : " serie(s)"}
        </p>
      </div>
      {filteredMovies
        .map((movie, i) => <Cards key={movie.imdbID} movie={movie}/>)
        .reduce<any[]>((rows, card, index) => {
          if (index % 4 === 0) rows.push([]);
          rows[rows.length - 1].push(card);
          return rows;
        }, [])
        .map((row, rowIndex) => (
          <div className="row mb-5" key={rowIndex}>
            {row}
          </div>
        ))}
    </>
  );
};

export default Home;
