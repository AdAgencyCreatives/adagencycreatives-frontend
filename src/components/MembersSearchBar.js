import { useState } from "react";
import "../styles/SearchBar.css";

const MembersSearchBar = ({ placeholder, onSearch }) => {
  const [input, setInput] = useState("");

  const onKeyDown = (e) => {
    onSearch(input)
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(input);
      }}
    >
        <div className="search-bar">
        <input
            className="search-community-members"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => onKeyDown()}
          />
          <button type="submit" className="clear-btn" onClick={(e) => setInput("") }>Clear</button>
        </div>
    </form>
  );
};

export default MembersSearchBar;
