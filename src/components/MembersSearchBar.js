import { useState } from "react";
import "../styles/SearchBar.css";

const MembersSearchBar = ({ placeholder, onSearch }) => {
  const [input, setInput] = useState("");

  const onKeyDown = (e) => {
    if (e.charCode === 13) {
      onSearch(input);
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    setInput("");
    onSearch("");
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
          onKeyDown={(e) => onKeyDown(e)}
        />
        <button type="button" className="clear-btn" onClick={(e) => onCancel(e)}>Clear</button>
      </div>
    </form>
  );
};

export default MembersSearchBar;
