import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "../SearchBar/SearchBar";

interface HeaderProps {
  onSearchResults: (movies: any[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchResults }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Metada Test</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/favoritos">Favoritos</Nav.Link>
        </Nav>
        <SearchBar onSearch={onSearchResults} />
      </Container>
    </Navbar>
  );
};

export default Header;
