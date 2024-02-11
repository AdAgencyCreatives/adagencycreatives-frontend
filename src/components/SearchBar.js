import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import TitleRecommendationsModal from "./dashboard/Modals/TitleRecommendationsModal";

const SearchBar = ({ placeholder, onSearch, role, advance_search_capabilities, subscription_status }) => {

  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [permission, setPermission] = useState(null);

  const handleCloseTitleRecommendations = (e, data) => {
    data?.setOpen(false)
    const searchKeyword = input + data?.value + ", ";
    setInput(searchKeyword);
    onSearch(searchKeyword);
    inputRef?.current?.focus();
  };

  useEffect(() => {
    setPermission(get_permission());
  }, [role, subscription_status]);

  const get_permission = () => {

    if (!role) {
      return { visible: false, message: "", proceed: false };
    }

    if (role == "admin") {
      return { visible: true, message: "", proceed: true };
    }

    if (role == "advisor" && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true };
    }

    if (role == 'recruiter' && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true };
    }

    if (role == 'agency' && subscription_status == 'active') {
      return { visible: true, message: "", proceed: true };
    }

    if (role == 'creative') {
      return { visible: true, message: "", proceed: true };
    }

    return { visible: true, message: "Post a Job for advance search feature", proceed: false };
  };

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
            ref={inputRef}
            className="search-input form-control"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <TitleRecommendationsModal permission={permission} handleClose={handleCloseTitleRecommendations} />
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
