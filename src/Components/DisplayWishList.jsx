import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const DisplayWishList = (props) => {
  const { wishList, Genre, handleOnRemove } = props;

  // Filter wishlist based on Genre if provided
  const filteredWishList = Genre
    ? wishList.filter((movie) => movie.Genre === Genre)
    : wishList;

  // Handle cases where wishList is undefined or empty
  if (!filteredWishList || filteredWishList.length === 0) {
    return <div>No movies found in wishlist.</div>;
  }

  return (
    <Row className="d-flex flex-wrap">
      {filteredWishList.map((movie) => (
        <Col
          key={movie.imdbID} // Ensure each child element has a unique key
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <Card style={{ width: "18rem" }} className="mb-3">
            <Card.Img variant="top" src={movie.Poster} height={300} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Plot}</Card.Text>
              <button
                className="btn btn-danger"
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
                onClick={() => handleOnRemove(movie.imdbID)}
                title="Delete"
              >
                <i className="fa-trash fa-solid "></i>
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DisplayWishList;
