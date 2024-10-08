import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import "./Cards.css";

interface CardProps {
  movie: any;
  isFavorite: boolean;
  onFavoriteToggle: (movie: any) => void;
}

const Cards: React.FC<CardProps> = ({
  movie,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="col-3 position-relative">
      <Card key={movie.imdbID} className="h-100">
        <Card.Img
          variant="top"
          src={movie.Poster || "../../Assets/images/poster_template.png"}
          alt={movie.Title}
        />
        <div className="position-absolute">
          <BsFillHeartFill
            className={`fav-heart ${isFavorite ? "favorite" : ""}`}
            onClick={() => onFavoriteToggle(movie)}
          />
        </div>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Link as={Link} to={`/movie?id=${movie.imdbID}`}>
            {movie.Title} ({movie.Year}) <AiFillCaretRight />
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
