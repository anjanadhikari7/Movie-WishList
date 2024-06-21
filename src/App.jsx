import { Container } from "react-bootstrap";
import MovieWishListContainer from "./Pages/MovieWishListContainer";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WishList from "./Pages/WishList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieWishListContainer />} />
      <Route path="/wishlist" element={<WishList />} />
    </Routes>
  );
}

export default App;
