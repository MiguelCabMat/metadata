import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchData } from "../../Services/Api/apiConnection";

interface SearchBarProps {
  onSearch: (result: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      s: query,
      apiKey: process.env.REACT_APP_OMDB_API,
    };

    try {
      const response: any = await fetchData(params);

      if (response.Response === "True") {
        onSearch(response.Search);
      } else {
        onSearch([]);
        console.error("Error:", response.Error);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Buscar"
            className=" mr-sm-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Enviar</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
