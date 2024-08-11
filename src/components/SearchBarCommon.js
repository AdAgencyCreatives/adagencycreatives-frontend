import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ input, setInput, placeholder, onSearch, searchBoxClass = "search-box" }) => {

    const inputRef = useRef(null);

    const onKeyDown = (e) => {
        if (e.key.toLowerCase() == 'enter') {
            onSearch(input);
        }
    };

    return (
        <div className={"row " + searchBoxClass}>
            <div className="search-bar col-md-10">
                <IoSearchOutline className="search-icon" />
                <input
                    ref={inputRef}
                    className="search-input form-control"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => onKeyDown(e)}
                />
                {input?.length > 0 && (
                    <IoCloseOutline className="reset-search-icon" onClick={(e) => {
                        setInput("");
                        onSearch("");
                    }} />
                )}
            </div>
            <div className="search-btn col-md-2">
                <button type="submit" className="btn"
                    onClick={(e) => onSearch(input)}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
