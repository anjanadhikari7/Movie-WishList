import Card from "react-bootstrap/Card";

const MovieCard = (props) => {
  const { movie = {} } = props;
  const { Title, Poster } = movie;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
