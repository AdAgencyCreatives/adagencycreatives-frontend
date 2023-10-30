import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  return (
    <div className="search-box row gy-3">
      <div className="search-bar col-md-10">
        <input
          className="search-input form-control"
          placeholder="Search by name, title, location, company, industry experience, media, full-time etc."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="search-btn col-md-2">
        <button className="btn" onClick={() => onSearch(input)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
