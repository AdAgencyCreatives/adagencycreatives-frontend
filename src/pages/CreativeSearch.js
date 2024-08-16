import Placeholder from "../assets/images/placeholder.png";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import Tooltip from "../components/Tooltip";
import { Context as AlertContext } from "../context/AlertContext";
import { useParams } from "react-router-dom";
import useHelper from "../hooks/useHelper";
import CreativeLocation from "../components/CreativeLocation";
import { useHistoryState } from "../hooks/useHistoryState";
import usePermissions from "../hooks/usePermissions";
import Loader from "../components/Loader";

const CreativeSearch = () => {

    const [loaded, setLoaded] = useState(false);

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

    const [inputLevel2, setInputLevel2] = useHistoryState("inputLevel2", "");
    const { field, search } = useParams();
    const { encodeSpecial, decodeSpecial } = useHelper();
    const [isCreativeLoading, setIsCreativeLoading] = useState(true);
    const [foundPermission, setFoundPermission] = useState(null);

    const { creatives, loading, loadMore, searchCreativesAdvanced, searchCreativesFull } = useCreatives("creatives-search");
    const {
        state: { bookmarks },
        createBookmark,
        getAllBookmarks,
        removeBookmark,
    } = useContext(DataContext);

    const {
        state: {
            role,
            user,
            token,
            subscription_status,
            advance_search_capabilities,
        },
    } = useContext(AuthContext);

    const { showAlert } = useContext(AlertContext);

    const [creativeSearchPlaceholder, setCreativeSearchPlaceholder] = useState(
        "Search by name or location"
    );
    //"Search by name, title, location, company, industry experience, media, full-time etc."

    const addToShortlist = (id) => {
        createBookmark(user.uuid, "creatives", id, () => {
            showAlert('Creative added to shortlist');
        });
    };

    const removeFromShortlist = (id) => {
        removeBookmark(id, () => {
            showAlert('Creative deleted from shortlist');
        });
    };

    useScrollLoader(loading, loadMore);

    useEffect(() => {
        if (user) getAllBookmarks(user.uuid, "creatives");
        if (user && field && search) {
            setInputLevel2("");
            searchCreativesFull(field, encodeSpecial(search));
        }
    }, [user, field, search]);

    const searchUserLevel2 = async (value) => {

        if (!value || value.length == 0) {
            searchCreativesFull(field, encodeSpecial(search));
            return;
        }

        setIsCreativeLoading(true);

        let searchStringLevel2 = "" + (value ? value : "");
        let searchTermsLevel2 =
            searchStringLevel2.indexOf(",") >= 0 ? searchStringLevel2.split(",") : [searchStringLevel2];

        setFoundPermission(null);
        let permission = proceed_search(searchStringLevel2, searchTermsLevel2);
        setFoundPermission(permission);

        showAlert(permission.message);

        if (!permission.proceed) {
            return;
        }

        let query_search_string_level2 = build_search_string(
            searchTermsLevel2,
            permission.terms_allowed
        );

        await searchCreativesFull(field, encodeSpecial(search), query_search_string_level2);
        if (user) await getAllBookmarks(user.uuid, "creatives");
        setIsCreativeLoading(false);
    };

    useEffect(() => {
        if (!role || !role.length || !advance_search_capabilities) {
            return;
        }

        if (
            (isAgency || isRecruiter) &&
            advance_search_capabilities
        ) {
            setCreativeSearchPlaceholder(
                "Search by name, title, location, company, industry experience, media, full-time etc."
            );
        }
    }, [role, advance_search_capabilities]);

    useEffect(() => {
        if (
            !role ||
            !role.length ||
            !subscription_status ||
            !subscription_status.length
        ) {
            return;
        }

        if (isCreative) {
            setCreativeSearchPlaceholder(
                "Select one: by name, location, or select a title"
            );
        }

        if (isAgency || isRecruiter) {
            if (hasSubscription) {
                setCreativeSearchPlaceholder(
                    "Select up to two: name, location, and/or select a title"
                );
            } else {
                setCreativeSearchPlaceholder("Select one: by name or location");
            }
        }
    }, [role, subscription_status]);

    useEffect(() => {
        if (!role || !role.length) {
            return;
        }

        if (isAdmin || (isAdvisor && hasSubscription)) {
            setCreativeSearchPlaceholder(
                "Search by name, title, location, company, industry experience, media, full-time etc."
            );
        }
    }, [role, hasSubscription]);

    useEffect(() => {
        if (creatives?.length >= 0) setIsCreativeLoading(false);
    }, [creatives]);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 2000);
    }, []);

    return (
        <div className="dark-container creative-search">
            <div className="container p-md-0 px-5">
                <h1 className="community-title text-white text-center mb-4">
                    {/* Advance Creatives Search */}
                    {search} Creatives
                </h1>
                {token && (
                    <>
                        {(isAdmin || (isAdvisor && hasSubscription)) && (
                            <div className="search-level2">
                                <div className="search-title">Search within Results</div>
                                <SearchBar
                                    input={inputLevel2}
                                    setInput={setInputLevel2}
                                    placeholder={creativeSearchPlaceholder}
                                    onSearch={searchUserLevel2}
                                    role={role}
                                    advance_search_capabilities={advance_search_capabilities}
                                    subscription_status={subscription_status}
                                />
                            </div>
                        )}
                    </>
                )}
                <div className="row g-4">
                    {isAdmin || (isAdvisor && hasSubscription) ? (<>
                        {!isCreativeLoading ? (
                            <>
                                {creatives &&
                                    creatives.map((item, index) => {
                                        const isShortlisted =
                                            bookmarks.find(
                                                (bookmark) => bookmark.resource.user_id == item.user_id
                                            ) || false;
                                        return (
                                            <div className="col-md-4 col-sm-6 col-12" key={`creative-${item.user_id}`}>
                                                <div className="sliderContent agencies-slider">
                                                    {role == "agency" && (
                                                        <Tooltip title={"Shortlist"} type="featured">
                                                            <button
                                                                className={
                                                                    "shortlist-btn" + (isShortlisted ? " active" : "")
                                                                }
                                                                onClick={() =>
                                                                    isShortlisted
                                                                        ? removeFromShortlist(isShortlisted.id)
                                                                        : addToShortlist(item.id)
                                                                }
                                                            >
                                                                <IoBookmarkOutline />
                                                            </button>
                                                        </Tooltip>
                                                    )}
                                                    <img
                                                        src={item?.user_thumbnail || item.profile_image || Placeholder}
                                                        className="candidateLogo"
                                                        width={150}
                                                        height={150}
                                                        alt=""
                                                        onError={(e) => {
                                                            e.target.src = Placeholder; // Set the backup image source
                                                        }}
                                                    />
                                                    <div className="agencyName">
                                                        <Link className="text-dark" to={`/creative/${item.slug}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                    <div className="position">
                                                        {isAdmin || isAdvisor ? (<>
                                                            <Link className="" to={`/creatives/search/industry-title/${item.category}`}>
                                                                {item.category || ""}
                                                            </Link>
                                                        </>) : (<>
                                                            {item.category || ""}
                                                        </>)}
                                                    </div>
                                                    <CreativeLocation location={item?.location} />
                                                    <div className="profileLink">
                                                        <Link
                                                            to={token ? `/creative/${item.slug}` : "#"}
                                                            onClick={(e) => {
                                                                if (!token) {
                                                                    e.preventDefault();
                                                                    showAlert("Please login to access");
                                                                }
                                                                return false;
                                                            }}
                                                            reloadDocument
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </>
                        ) : (
                            <div className="load-more text-center">
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </>) : (<>
                        {loaded ? (
                            <div className="no_result">
                                <p>Post a Job for advance search capabilities</p>
                            </div>
                        ) : (
                            <>
                                <Loader fullHeight={false} />
                            </>
                        )}
                    </>)}
                    <div className="load-more text-center">
                        {loading && !isCreativeLoading && (
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeSearch;
