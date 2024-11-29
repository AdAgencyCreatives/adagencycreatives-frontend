import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import TitleRecommendationsModal from "./dashboard/Modals/TitleRecommendationsModal";
import { IoCloseCircleOutline, IoCloseCircleSharp, IoCloseOutline, IoCloseSharp, IoSearch, IoSearchCircleSharp, IoSearchOutline, IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ input, setInput, placeholder, onSearch, role, advance_search_capabilities, subscription_status }) => {

    const inputRef = useRef(null);

    const [permission, setPermission] = useState(null);

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


    const handleCloseTitleRecommendations = (e, data) => {
        if (data?.setOpen) {
            data?.setOpen(false)
        }
        if (!data?.value) {
            return;
        }
        // let trimmedInput = modifyInput(input.trim());
        // let appendComma = trimmedInput?.length > 0 && trimmedInput.charAt(trimmedInput.length - 1) != ',';
        // const searchKeyword = trimmedInput + (appendComma ? ', ' : ' ') + data?.value + (permission?.append_comma ? ", " : "");

        const searchKeyword = data?.value + ", ";
        setInput(searchKeyword);
        onSearch(searchKeyword);
        inputRef?.current?.focus();
    };

    useEffect(() => {
        setPermission(get_permission());
    }, [role, subscription_status]);

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                let trimmedInput = modifyInput(input.trim());
                setInput(trimmedInput);
                onSearch(trimmedInput);
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
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {input?.length > 0 && (
                        <IoCloseOutline className="reset-search-icon" onClick={(e) => {
                            setInput("");
                            onSearch("");
                        }} />
                    )}
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
