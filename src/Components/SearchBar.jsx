import { useRef } from "react";
import { Button, Form, Stack } from "react-bootstrap";
const SearchBar = (props) => {
  const { searchMovie } = props;
  const searchInputRef = useRef(null);
  const handleOnclick = (searchInputRef) => {
    searchMovie(searchInputRef.current.value);
    searchInputRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleOnclick(searchInputRef);
    }
  };
  return (
    <Stack direction="horizontal" gap={4}>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Enter Movie Title"
        ref={searchInputRef}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="outline-primary"
        size="lg"
        onClick={() => handleOnclick(searchInputRef)}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
