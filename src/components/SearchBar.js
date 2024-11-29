import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { getSearchItems } from "../context/SearchDataContext";
import { lime } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ input, setInput, placeholder, onSearch, role, advance_search_capabilities, subscription_status }) => {

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [permission, setPermission] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [loadingSearchItems, setLoadingSearchItems] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [limitSuggestions, setLimitSuggestions] = useState(25);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const modifyInput = (text) => {
    let searchItems = [
      ["  ", " "],
      [",,", ","],
      ["..", "."],
      [" ,", ","],
      [" .", "."],
      [",.", ","],
      [".,", ","],
    ];

    let newText = text || "";
    let continueSearch = true;

    while (continueSearch) {
      continueSearch = false;
      searchItems.forEach(element => {
        while (newText.indexOf(element[0]) >= 0) {
          newText = newText.replace(element[0], element[1]);
          continueSearch = true;
        }
      });
    }

    return newText;
  };

  useEffect(() => {
    setPermission(get_permission());
  }, [role, subscription_status]);

  const handleDataError = (error) => {
    console.log("Error:");
    console.log(error);
  }

  useEffect(() => {
    (async () => {
      await getSearchItems((data, error) => {
        if (data) {
          let search_items = [];
          let urls = [];
          urls['categories'] = "/creatives/search/industry-title/";
          urls['states'] = "/creatives/location/state/";
          urls['cities'] = "/creatives/location/city/";
          urls['employment_types'] = "/creatives/search/work-type/";
          urls['years_of_experience'] = "/creatives/search/years-of-experience/";
          urls['media_experiences'] = "/creatives/search/years-of-experience//";
          urls['strengths'] = "/creatives/search/strengths/";
          urls['industry_experiences'] = "/creatives/search/industry-experience//";
          let keys = Object.keys(data);
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (data[key]?.length > 0) {
              for (let dIndex = 0; dIndex < data[key].length; dIndex++) {
                const item = data[key][dIndex];

                search_items.push({ type: key, name: item['name'], url: urls[key] + item['name'] });
              }
            }
          }
          setSearchItems(search_items);
        }
        if (error) {
          handleDataError(error);
        }
        setLoadingSearchItems(false);
      });
    })();
  }, []);

  const get_permission = () => {

    if (!role) {
      return { visible: false, message: "", proceed: false, append_comma: false };
    }

    if (role == "admin") {
      return { visible: true, message: "", proceed: true, append_comma: true };
    }

    if (role == "advisor" && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true, append_comma: true };
    }

    if (role == 'recruiter' && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true, append_comma: true };
    }

    if (role == 'agency' && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true, append_comma: true };
    }

    if (role == 'creative') {
      return { visible: true, message: "", proceed: true, append_comma: false };
    }

    return { visible: true, message: "Post a Job for advance search feature", proceed: false, append_comma: false };
  };

  const handleSearchInput = (e) => {
    setInput(e.target.value)

    let filtered_search_items = filterSearchItems(e.target.value);
    setSuggestions(filtered_search_items);
    setShowSuggestions(filtered_search_items?.length > 0);
    // console.log(filtered_search_items);
  };

  const filterSearchItems = (searchText) => {
    if (searchText?.length > 0) {
      searchText = searchText.toLowerCase();
      let filtered = searchItems.filter(item => item.name.toLowerCase().indexOf(searchText) != -1);
      return filtered;
    }
    return [];
  };

  const handleSearchClick = (item) => {
    setShowSuggestions(false);
    navigate(selectRef.current.options[selectRef.current.selectedIndex].value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (showSuggestions && selectRef?.current?.selectedIndex != -1) {
          e.preventDefault();
          e.stopPropagation();
          handleSearchClick(selectRef.current.options[selectRef.current.selectedIndex].data);
        } else {
          let trimmedInput = modifyInput(input.trim());
          setInput(trimmedInput);
          onSearch(trimmedInput);
        }
        return false;
      }}
    >
      <div className="search-box row gy-3">
        <div className="search-bar col-md-10">
          <IoSearchOutline className="search-icon" />
          <input
            ref={inputRef}
            className="search-input form-control"
            placeholder={placeholder}
            value={input}
            onChange={(e) => handleSearchInput(e)}
            onKeyUp={(e) => {
              if (e.key == 'Escape' || e.key == 'Enter') {
                setShowSuggestions(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key == 'ArrowDown') {
                e.preventDefault();
                e.stopPropagation();
                if (selectRef?.current) {
                  selectRef?.current.focus();
                  selectRef.current.selectedIndex = 0;
                }
              }
            }}
          />
          {input?.length > 0 && (
            <IoCloseOutline className="reset-search-icon" onClick={(e) => {
              setInput("");
              onSearch("");
            }} />
          )}
          <div className="search-suggestions" style={{ display: showSuggestions ? 'flex' : 'none' }}>
            {suggestions?.length > 0 && (<>
              <select
                ref={selectRef}
                onBlur={(e) => {
                  if (selectRef?.current) {
                    selectRef.current.selectedIndex = -1;
                  }
                }}
                size={Math.max(2, showAllSuggestions ? suggestions.length : (limitSuggestions > suggestions.length ? suggestions.length : limitSuggestions))}
                style={{ height: (showAllSuggestions ? suggestions.length : (limitSuggestions > suggestions.length ? suggestions.length : limitSuggestions) == 1 ? '45px' : 'auto') }}
              >
                {suggestions.slice(0, showAllSuggestions ? suggestions.length - 1 : limitSuggestions - 1).map((item, index) => <option key={index} value={item.url} data={item} onClick={(e) => handleSearchClick(item)}>{item.name}</option>)}
              </select>
            </>)}
          </div>
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
