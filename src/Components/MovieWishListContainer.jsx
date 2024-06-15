import axios from "axios";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import MovieCard from "./MovieCard";
import AddToWishList from "./AddToWishList";
import DisplayWishList from "./DisplayWishList";

const API_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&t=";
const SEARCH_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&s=";

const MovieWishListContainer = () => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const [isLoading, setIsLoading] = useState(false);
  // isNext state defines whether the displayed movie is a new search or from similar movie list
  const [isNext, setIsNext] = useState();

  // Function to search for a movie by title
  const searchMovie = async (movieTitle) => {
    setIsNext(false); // Indicating its a new search
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + movieTitle);
      if (response.data) {
        setSearchedMovie(response.data);

        // Get an array of similar movies when a movie is searched.
        if (!isNext) {
          const searchResponse = await axios.get(SEARCH_URL + movieTitle);
          if (searchResponse.data && searchResponse.data.Search) {
            console.log(searchResponse.data.Search);
            setSimilarMovies(searchResponse.data.Search);
            // Index reset for new search
            setCurrentMovieIndex(0);
          } else {
            // Reset similarMovies if no results
            setSimilarMovies([]);
          }
        }

        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  // Add a movie to the wishlist
  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };

  // Initial search  when page starts
  useEffect(() => {
    searchMovie("X-Men");
  }, []);

  // Effect to update localStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  // Discard movie
  const handleOnDiscard = () => {
    searchMovie("X-Men");
    setIsNext(true);
  };

  // Next movie
  const handleNextMovie = () => {
    if (similarMovies.length > 0) {
      const nextIndex = (currentMovieIndex + 1) % similarMovies.length;
      setCurrentMovieIndex(nextIndex);
      searchMovie(similarMovies[nextIndex].Title);
      //Indicating that it isn't new search but user is viewing similar movies.
      setIsNext(true);
    }
  };

  // Deleting movie from wishList
  const handleOnRemove = (ID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie from your wishlist?"
    );
    if (confirmDelete) {
      const updatedWishList = wishList.filter((movie) => movie.imdbID !== ID);
      setWishList(updatedWishList);
    }
  };

  return (
    <Container fluid className="p-4 subtle-container">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-dark mb-4">Movie WishList</h1>
          <SearchBar searchMovie={searchMovie} />
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          {isLoading && (
            <Button variant="warning" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          )}
          {!isLoading && (
            <Card className="shadow-sm mb-4 bg-light">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <MovieCard movie={searchedMovie} />
                  </Col>
                  <Col
                    md={8}
                    className="d-flex flex-column justify-content-between"
                  >
                    <AddToWishList
                      movie={searchedMovie}
                      addMovieToWishList={addMovieToWishList}
                      wishList={wishList}
                      handleOnDiscard={handleOnDiscard}
                    />
                    <Button
                      variant="info"
                      className="mt-3"
                      onClick={handleNextMovie}
                    >
                      Next Similar Movie
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Tabs defaultActiveKey="all" id="wishlist-tabs" className="mb-3">
        <Tab eventKey="all" title="All Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="action" title="Action Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            Genre="Action"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="comedy" title="Comedy Movies" className="p-3 subtle-tab">
          <DisplayWishList
            wishList={wishList}
            Genre="Comedy"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MovieWishListContainer;
