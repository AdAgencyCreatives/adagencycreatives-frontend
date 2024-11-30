import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { getSearchItems } from "../context/SearchDataContext";
import { useNavigate } from "react-router-dom";
import usePermissions from "../hooks/usePermissions";

const SearchBar = ({ input, setInput, placeholder, onSearch, role, advance_search_capabilities, subscription_status }) => {

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [permission, setPermission] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [limitSuggestions, setLimitSuggestions] = useState(10);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [isEventListenerAdded, setIsEventListenerAdded] = useState(false);

  const {
    isAdmin,
    isAdvisor,
    isAgency,
    isCreative,
    isRecruiter,
    hasSubscription,
    build_search_string,
    which_search,
    proceed_search,
  } = usePermissions();

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


  const get_allowed_types = () => {
    let $allowed_types = [];
    if (!role) {
      return $allowed_types;
    }

    if (isAdmin || ((isAdvisor || isAgency || isRecruiter) && hasSubscription) || isCreative) {
      $allowed_types.push("Category");
    }

    $allowed_types.push("State");
    $allowed_types.push("City");

    if (isAdmin || (isAdvisor && hasSubscription)) {
      $allowed_types.push("Employment Type");
      $allowed_types.push("Years of Experience");
      $allowed_types.push("Media Experience");
      $allowed_types.push("Strength");
      $allowed_types.push("Industry Experience");
      $allowed_types.push("Education College");
      $allowed_types.push("Education Degree");
      $allowed_types.push("Experience Company");
    }

    return $allowed_types;
  };

  const get_type_urls = () => {
    let urls = [];
    urls['Category'] = "/creatives/search/industry-title/";
    urls['State'] = "/creatives/location/state/";
    urls['City'] = "/creatives/location/city/";
    urls['Employment Type'] = "/creatives/search/work-type/";
    urls['Years of Experience'] = "/creatives/search/years-of-experience/";
    urls['Media Experience'] = "/creatives/search/media-experience/";
    urls['Strength'] = "/creatives/search/strengths/";
    urls['Industry Experience'] = "/creatives/search/industry-experience/";
    urls['Education College'] = "/creatives/search/education-college/";
    urls['Education Degree'] = "/creatives/search/education-degree-program/";
    urls['Experience Company'] = "/creatives/search/experience-company/";
    return urls;
  };

  const loadSearchItems = () => {
    (async () => {
      await getSearchItems((data, error) => {
        let allowed_types = get_allowed_types();
        if (data) {
          let search_items = [];
          let urls = get_type_urls();
          let keys = Object.keys(data);
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (data[key]?.length > 0 && allowed_types.includes(key)) {
              for (let dIndex = 0; dIndex < data[key].length; dIndex++) {
                const item = data[key][dIndex];

                let item_display_name = item['name'];
                let found = search_items.filter(sitem => sitem.name.toLowerCase() == item['name'].toLowerCase());
                if (found?.length > 0) {
                  // item_display_name = item['name'] + " (" + key + ")";
                  continue;
                }
                search_items.push({ type: key, name: item['name'], url: urls[key] + item['name'], displayName: item_display_name });
              }
            }
          }
          setSearchItems(search_items);
        }
        if (error) {
          handleDataError(error);
        }
      });
    })();
  };

  useEffect(() => {
    loadSearchItems();
  }, [role]);

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
    let filtered = [];
    if (searchText?.length > 0) {
      searchText = searchText.toLowerCase();
      let allowed_types = get_allowed_types();
      let filtered_starts_with = searchItems.filter(item => item.name.toLowerCase().indexOf(searchText) == 0);
      let filtered_contains = searchItems.filter(item => item.name.toLowerCase().indexOf(searchText) > 0);
      if (filtered_starts_with?.length > 0) {
        filtered = [...filtered, ...filtered_starts_with];
      }
      if (filtered_contains?.length > 0) {
        filtered = [...filtered, ...filtered_contains];
      }
    }
    return filtered;
  };

  const compareSearchItems = (searchText) => {
    if (searchText?.length > 0) {
      searchText = searchText.toLowerCase();
      let allowed_types = get_allowed_types();
      let filtered = searchItems.filter(item => item.name.toLowerCase() == searchText);
      return filtered;
    }
    return [];
  };

  const handleSearchClick = (item) => {
    setShowSuggestions(false);

    // if (isAdmin || (isAdvisor && hasSubscription)) {
    //   navigate(selectRef.current.options[selectRef.current.selectedIndex].getAttribute('data_url'));
    //   return;
    // }

    let trimmedInput = modifyInput(selectRef.current.options[selectRef.current.selectedIndex].value);
    setInput(trimmedInput);
    setSearchTriggered(true);
    onSearch(trimmedInput, true);
  };

  useEffect(() => {
    if (!isEventListenerAdded) {
      document.addEventListener('mousedown', function (event) {
        const targetElement = event.target;
        //console.log('Target element:', targetElement);
      });
      setIsEventListenerAdded(true);
    }
  }, []);

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
          let isFromSearchItems = false;
          let compared_search_items = [];
          if (!(trimmedInput.indexOf(",") >= 0)) {
            compared_search_items = compareSearchItems(trimmedInput);
            isFromSearchItems = compared_search_items?.length > 0;
            if (isFromSearchItems) {
              trimmedInput = compared_search_items[0].name;
            }
          }
          setInput(trimmedInput);
          setSearchTriggered(true);
          onSearch(trimmedInput, isFromSearchItems);
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
          {(input?.length > 0 || searchTriggered) && (
            <>
              <IoCloseOutline className="reset-search-icon" onClick={(e) => {
                setInput("");
                setSearchTriggered(false);
                onSearch("");
              }} />

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
                    {suggestions.slice(0, showAllSuggestions ? suggestions.length : Math.min(suggestions.length, limitSuggestions)).map((item, index) => <option key={index} value={item.name} data_url={item.url} onClick={(e) => handleSearchClick(item)}>{item.displayName}</option>)}
                  </select>
                </>)}
              </div>
            </>
          )}
        </div>
        <div className="search-btn col-md-2">
          <button type="submit" className="btn">
            Search
          </button>
        </div>
      </div>
    </form >
  );
};

export default SearchBar;
