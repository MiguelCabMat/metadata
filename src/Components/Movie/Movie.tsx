import React, { useEffect, useState } from "react";
import { fetchData } from "../../Services/Api/apiConnection";
import Spinner from "react-bootstrap/Spinner";
import { Card, Row, Col } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
import "./Movie.css";

interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
}

const Movie: React.FC = () => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params: any = new URLSearchParams(window.location.search);
    const id: string = params.get("id");

    const fetchMovieData = async () => {
      const movieParams = {
        i: id,
        apiKey: process.env.REACT_APP_OMDB_API,
        plot: "full",
      };

      try {
        const response: any = await fetchData(movieParams);
        if (response.Response === "True") {
          setMovie(response);
        } else {
          setError(response.Error);
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Ninguna película seleccionada para mostrar.</p>;
  }

  return (
    <div className="container mt-4">
      <Card>
        <Row>
          <Col md={4}>
            <Card.Img
              variant="top"
              src={movie.Poster}
              alt={movie.Title}
              className="img-fluid"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="h-100">
              <Card.Title>
                {movie.Title}{" "}
                <span className={`text-muted small ${movie.Rated}`}>
                  {movie.Rated}
                </span>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {movie.Year}
              </Card.Subtitle>
              <ul className="list-unstyled">
                <li>
                  <strong>Género:</strong> {movie.Genre}
                </li>
                <li>
                  <strong>Director:</strong> {movie.Director}
                </li>
                <li>
                  <strong>Guionistas:</strong> {movie.Writer}
                </li>
                <li>
                  <strong>Reparto:</strong> {movie.Actors}
                </li>
                <li>
                  <strong>Duración:</strong> {movie.Runtime}
                </li>
              </ul>
              <Card.Text>
                <strong>Sinopsis:</strong> {movie.Plot}
              </Card.Text>
              <Card.Text>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center">
                    Metacritic: {movie.Metascore} / 100 <BsFillStarFill />
                  </li>
                  <li className="d-flex align-items-center">
                    IMDB: {movie.imdbRating}/ 10 <BsFillStarFill />
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Movie;
