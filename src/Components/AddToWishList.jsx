import { Alert, Button, Card, Stack } from "react-bootstrap";

const AddToWishList = (props) => {
  const { addMovieToWishList, movie, wishList = [], handleOnDiscard } = props;

  const handleOnclick = (genre) => {
    const movieWithGenre = { ...movie, Genre: genre };
    addMovieToWishList(movieWithGenre);
  };
  const disableButtons = wishList.find((item) => item.imdbID === movie.imdbID);
  return (
    <>
      <Alert>
        <Stack>
          <Card.Text>{movie.Plot}</Card.Text>
          <Card.Text>Year: {movie.Year}</Card.Text>
          <Card.Text>Runtime: {movie.Runtime}</Card.Text>
          <Card.Text>Cast: {movie.Actors}</Card.Text>
          <Card.Text>Country: {movie.Country}</Card.Text>
          <Card.Text>Language: {movie.Language}</Card.Text>

          <Stack direction="horizontal" gap={4}>
            <Button
              disabled={disableButtons}
              variant="outline-primary"
              onClick={() => handleOnclick("Action")}
            >
              + Add to Action
            </Button>
            <Button
              disabled={disableButtons}
              variant="outline-success"
              onClick={() => handleOnclick("Comedy")}
            >
              + Add to Comedy
            </Button>
            <Button variant="outline-danger" onClick={handleOnDiscard}>
              Discard
            </Button>
          </Stack>
        </Stack>
      </Alert>
    </>
  );
};

export default AddToWishList;
