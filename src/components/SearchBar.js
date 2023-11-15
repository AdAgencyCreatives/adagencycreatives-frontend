import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, onSearch }) => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSearch(input);
        return false;
      }}
    >
      <div className="search-box row gy-3">
        <div className="search-bar col-md-10">
          <input
            className="search-input form-control"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="search-btn col-md-2">
          <button type="submit" className="btn">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
