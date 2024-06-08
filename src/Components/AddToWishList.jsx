import { Alert, Button, Stack } from "react-bootstrap";

const AddToWishList = (props) => {
  const { addMovieToWishList, movie, wishList = [], handleOnDiscard } = props;

  const handleOnclick = (genre) => {
    const movieWithGenre = { ...movie, Genre: genre };
    addMovieToWishList(movieWithGenre);
  };
  const disableButtons = wishList.find((item) => item.imdbID === movie.imdbID);
  return (
    <>
      <Stack>
        <Alert> Add To WishList</Alert>
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
    </>
  );
};

export default AddToWishList;
