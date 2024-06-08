import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MovieCard = (props) => {
  const { movie = {} } = props;
  const { Title, Poster, Plot } = movie;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={Poster} height={300} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
