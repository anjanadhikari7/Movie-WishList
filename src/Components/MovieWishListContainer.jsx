import axios from "axios";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { Button, Spinner, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import MovieCard from "./MovieCard";
import AddToWishList from "./AddToWishList";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DisplayWishList from "./DisplayWishList";
const API_URL =
  "http://www.omdbapi.com/?i=tt3896198&apikey=e68479dc&type=movie&t=";
const MovieWishListContainer = () => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  //Function to search the movie
  const searchMovie = async (movieTitle) => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL + movieTitle);
      if (response.data) {
        setIsLoading(false);
      }
      setSearchedMovie(response.data);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  // Function to add movies to wishlist
  const addMovieToWishList = (movie) => {
    setWishList([...wishList, movie]);
  };
  // UseEffect hook - Gives control over the life cycle of component
  // useEffect(()=>, {})
  // []Dependancy Array
  useEffect(() => {
    searchMovie();
  }, []);

  // Discard Search Item
  const handleOnDiscard = () => {
    searchMovie();
  };

  //Function for Deleting Card
  const handleOnRemove = (ID) => {
    const updatedWishList = wishList.filter((movie) => movie.imdbID !== ID);
    setWishList(updatedWishList);
  };
  return (
    <>
      {/* Search Bar */}
      <SearchBar searchMovie={searchMovie} />
      {/* Search Result */}

      {isLoading && (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      )}
      {!isLoading && (
        <Stack direction="horizontal" gap={4} className="my-4">
          <MovieCard movie={searchedMovie} />
          <AddToWishList
            movie={searchedMovie}
            addMovieToWishList={addMovieToWishList}
            wishList={wishList}
            handleOnDiscard={handleOnDiscard}
          />
        </Stack>
      )}
      {/* Add to WishList section */}
      {/* Wishlist Section */}

      <hr />

      <Tabs className="mb-3">
        <Tab eventKey="All" title="All">
          All Movies
          <DisplayWishList
            wishList={wishList}
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="action" title="Action">
          Action Movies
          <DisplayWishList
            wishList={wishList}
            Genre="Action"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
        <Tab eventKey="comedy" title="Comedy">
          Comedy Movies
          <DisplayWishList
            wishList={wishList}
            Genre="Comedy"
            handleOnRemove={handleOnRemove}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default MovieWishListContainer;
