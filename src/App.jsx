import { Container } from "react-bootstrap";
import MovieWishListContainer from "./Components/MovieWishListContainer";
import "./App.css";

function App() {
  return (
    <Container className="my-4">
      <MovieWishListContainer />
    </Container>
  );
}

export default App;
