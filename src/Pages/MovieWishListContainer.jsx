import axios from "axios";
import { useEffect, useState } from "react";
import {
  Spinner,
  Container,
  Row,
  Col,
  Image,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import AddToWishList from "../Components/AddToWishList";
import { FaHeart } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import WishList from "./WishList";
import MovieSection from "../Components/MovieSection";
import SearchBar from "../Components/SearchBar";
import "../Components/MovieWishListContainer.css"; // Import custom CSS for styling
import DisplayWishList from "../Components/DisplayWishList";

const API_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&t=";
const SEARCH_URL = "https://www.omdbapi.com/?apikey=e68479dc&type=movie&s=";

const MovieWishListContainer = () => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const storedMovieList = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(storedMovieList);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);

  // Function to search for a movie by title
  const searchMovie = async (movieTitle) => {
    setIsNext(false);
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL + movieTitle);
      if (response.data) {
        setSearchedMovie(response.data);

        // Get an array of similar movies when a movie is searched.
        if (!isNext) {
          const searchResponse = await axios.get(SEARCH_URL + movieTitle);
          if (searchResponse.data && searchResponse.data.Search) {
            setSimilarMovies(searchResponse.data.Search);
            setCurrentMovieIndex(0);
          } else {
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

  // Initial search when page starts
  useEffect(() => {
    searchMovie("X-Men");
  }, []);

  // Effect to update localStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  // Handle click on a movie from similarMovies
  const handleMovieClick = async (movieId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=e68479dc&type=movie&i=${movieId}`
      );
      if (response.data) {
        setSearchedMovie(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
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
    <div className="wrapper">
      <header className="header">
        <h1 className="text-center text-light mb-4">Movie Wishlist</h1>
        {wishList.length > 0 && (
          <Link
            to="/wishlist"
            className="text-light d-flex align-items-center text-decoration-none position-absolute top-0 end-0 mt-4 me-4"
          >
            <FaHeart className="me-2" style={{ fontSize: "1.5rem" }} /> My
            Wishlist
          </Link>
        )}
        <SearchBar searchMovie={searchMovie} />
      </header>

      <Container fluid className="main-content">
        <Row className="justify-content-center">
          <Col md={8} className="movie-list">
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {!isLoading && searchedMovie.Poster && (
              <div className="movie-card-container">
                <Row className="align-items-center">
                  <Col md={6}>
                    <Image
                      src={searchedMovie.Poster}
                      className="movie-poster"
                      fluid
                    />
                  </Col>
                  <Col md={6}>
                    <div className="movie-card-content">
                      <MovieCard movie={searchedMovie} />
                      <div className="d-flex justify-content-end mt-3">
                        <AddToWishList
                          movie={searchedMovie}
                          addMovieToWishList={addMovieToWishList}
                          wishList={wishList}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            <Card className="shadow-sm bg-dark text-light mb-3">
              <Card.Body className="d-flex flex-column">
                <h4 className="mb-3 text-light">Similar Movies</h4>
                <MovieSection
                  movies={similarMovies}
                  onMovieClick={handleMovieClick}
                />
              </Card.Body>
            </Card>
          </Col>
          {wishList.length > 0 && (
            <Tabs
              defaultActiveKey="all"
              id="wishlist-tabs"
              className="mb-3 bg-dark"
            >
              <Tab eventKey="all" title="All Movies" className="p-3 subtle-tab">
                <DisplayWishList
                  wishList={wishList}
                  handleOnRemove={handleOnRemove}
                />
              </Tab>
              <Tab
                eventKey="action"
                title="Action Movies"
                className="p-3 subtle-tab"
              >
                <DisplayWishList
                  wishList={wishList}
                  Genre="Action"
                  handleOnRemove={handleOnRemove}
                />
              </Tab>
              <Tab
                eventKey="comedy"
                title="Comedy Movies"
                className="p-3 subtle-tab"
              >
                <DisplayWishList
                  wishList={wishList}
                  Genre="Comedy"
                  handleOnRemove={handleOnRemove}
                />
              </Tab>
            </Tabs>
          )}
          <Routes>
            <Route
              path="/wishlist"
              element={
                <WishList wishList={wishList} handleOnRemove={handleOnRemove} />
              }
            />
          </Routes>
        </Row>
      </Container>
    </div>
  );
};

export default MovieWishListContainer;
