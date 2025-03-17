import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import { useHistoryState } from "../hooks/useHistoryState";
import Tooltip from "../components/Tooltip";
import CreativeImageLoader from "../components/CreativeImageLoader";
import { Context as AlertContext } from "../context/AlertContext";
import DelayedOutput from "../components/DelayedOutput";
import CreativeLocation from "../components/CreativeLocation";
import usePermissions from "../hooks/usePermissions";
import ViewSearchCreative from "./User/ViewSearchCreative";
import CommonModal from "../components/modals/CommonModal";
import eventEmitter from "../components/EventEmitter";

const Creatives = () => {

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

  const [input, setInput] = useHistoryState("input", "");
  const [inputClicked, setInputClicked] = useHistoryState("inputClicked", false);
  const [inputLevel2, setInputLevel2] = useHistoryState("inputLevel2", "");
  const [isCreativeLoading, setIsCreativeLoading] = useState(true);
  const [searchDone, setSearchDone] = useState("");
  const [advanceSearchHasData, setAdvanceSearchHasData] = useState(false);
  const [foundPermission, setFoundPermission] = useState(null);
  const [foundPermissionLevel2, setFoundPermissionLevel2] = useState(null);
  const [openCreativeProfileDialog, setOpenCreativeProfileDialog] = useState(false);
  const [previewCreative, setPreviewCreative] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const anchor = window.location.hash.slice(1);

  // Parse the initial state from the URL hash
  const getHashParams = () => {
    const hashParams = new URLSearchParams(location.hash.replace("#", "?"));
    return {
      search: hashParams.get("search") || "",
      advance: hashParams.get("advance") || "",
      preview: hashParams.get("preview") || "",
    };
  };

  // Initialize state from URL parameters
  const [params, setParams] = useState(getHashParams);

  // Update state when URL hash changes (only if different)
  useEffect(() => {
    const newParams = getHashParams();
    if (
      newParams.search !== params.search ||
      newParams.advance !== params.advance ||
      newParams.preview !== params.preview
    ) {
      // Remove empty values
      const cleanedParams = Object.fromEntries(
        Object.entries(newParams).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
      );

      setParams(cleanedParams);
    }
  }, [location.hash]); // Run only when the hash changes

  // Update the URL when state changes, but only if it's actually different
  useEffect(() => {
    // Remove empty values
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    if (Object.keys(cleanedParams).length === 0) {
      return;
    }

    // Convert object to URL query string
    let queryString = new URLSearchParams(cleanedParams).toString();
    queryString = `#${queryString}`;

    if (location.hash !== queryString) {
      navigate(queryString, { replace: true }); // Avoid history stack pollution
    }
  }, [params, navigate, location.hash]);

  const { creatives, getCreatives, loading, loadMore, searchCreativesAdvanced } =
    useCreatives("creative");

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
    "Search: name or location"
  );

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "creatives", id, () => {
      showAlert("Creative added to shortlist");
    });
  };


  const removeFromShortlist = (id) => {
    removeBookmark(id, () => {
      showAlert("Creative deleted from shortlist");
    });
  };

  useScrollLoader(loading, loadMore);

  const searchUser = async (value, clicked = false) => {

    setInputClicked(clicked);
    setAdvanceSearchHasData(false);
    setInputLevel2("");
    setSearchDone("");

    if (!value || value.length == 0) {
      setParams((prev) => ({ ...prev, search: '' }));
      getCreatives();
      return;
    }

    setIsCreativeLoading(true);
    let searchString = "" + (value ? value : "");
    let searchTerms =
      searchString.indexOf(",") >= 0 ? searchString.split(",") : [searchString];

    setFoundPermission(null);
    let permission = proceed_search(searchString, searchTerms);
    setFoundPermission(permission);

    showAlert(permission.message);

    if (!permission.proceed) {
      getCreatives();
      return;
    }

    let query_search_string = build_search_string(
      searchTerms,
      permission.terms_allowed
    );

    if (query_search_string?.length > 0) {
      setSearchDone(value);
      await searchCreativesAdvanced(which_search(), query_search_string, role, "", (data) => {
        setAdvanceSearchHasData(data?.length > 0);
      });
      if (user) await getAllBookmarks(user.uuid, "creatives");

      if (params.search !== query_search_string) setParams((prev) => ({ ...prev, search: query_search_string }));
    } else {
      //await getCreatives();
    }

    setIsCreativeLoading(false);
  };

  const searchUserLevel2 = async (value) => {

    if (!value || value.length == 0) {
      setParams((prev) => ({ ...prev, advance: '' }));
      searchUser(input);
      return;
    }

    setIsCreativeLoading(true);

    let searchStringLevel1 = "" + (input ? input : "");
    let searchTermsLevel1 =
      searchStringLevel1.indexOf(",") >= 0 ? searchStringLevel1.split(",") : [searchStringLevel1];

    let searchStringLevel2 = "" + (value ? value : "");
    let searchTermsLevel2 =
      searchStringLevel2.indexOf(",") >= 0 ? searchStringLevel2.split(",") : [searchStringLevel2];

    setFoundPermission(null);
    let permission = proceed_search(searchStringLevel1, searchTermsLevel1);
    setFoundPermission(permission);

    setFoundPermissionLevel2(null);
    let permissionLevel2 = proceed_search(searchStringLevel2, searchTermsLevel2);
    setFoundPermissionLevel2(permissionLevel2);

    // showAlert(permission.message);
    showAlert(permissionLevel2.message);

    if (!permissionLevel2.proceed) {
      return;
    }

    let query_search_string_level1 = build_search_string(
      searchTermsLevel1,
      permission.terms_allowed
    );

    let query_search_string_level2 = build_search_string(
      searchTermsLevel2,
      permissionLevel2.terms_allowed
    );

    if (params.advance !== query_search_string_level2) setParams((prev) => ({ ...prev, advance: query_search_string_level2 }));

    await searchCreativesAdvanced(which_search(), query_search_string_level1, role, query_search_string_level2);
    if (user) await getAllBookmarks(user.uuid, "creatives");
    setIsCreativeLoading(false);
  };

  useEffect(() => {
    if (user) getAllBookmarks(user.uuid, "creatives");
  }, [user]);

  useEffect(() => {
    if (!role || !role.length || !advance_search_capabilities) {
      return;
    }

    if (
      (isAgency || isRecruiter) &&
      advance_search_capabilities
    ) {
      setCreativeSearchPlaceholder(
        "Search: name, title, location, company, industry experience, media, full-time etc."
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
        "Search: title, name, or location"
      );
    }

    if (isAgency || isRecruiter) {
      if (hasSubscription) {
        setCreativeSearchPlaceholder(
          "Search: title, name, or location"
        );
      } else {
        setCreativeSearchPlaceholder("Search: name or location");
      }
    }
  }, [role, subscription_status]);

  useEffect(() => {
    if (!role || !role.length) {
      return;
    }

    if (isAdmin || (isAdvisor && hasSubscription)) {
      setCreativeSearchPlaceholder(
        "Search: name, title, location, company, industry experience, media, full-time etc."
      );
    }
  }, [role, hasSubscription]);

  useEffect(() => {
    if (creatives?.length >= 0) setIsCreativeLoading(false);
  }, [creatives]);

  useEffect(() => {
    if (role && params && creatives?.length > 0 && (isAdmin || ((isAdvisor || isAgency || isRecruiter) && hasSubscription))) {
      let index = getPreviewIndex();
      if (index >= 0 && index < creatives?.length) {
        setPreviewCreative(creatives[index]);
        setOpenCreativeProfileDialog(true);
      }
    }

    const newParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    if (role && newParams?.search && !newParams?.advance) {
      setInput(newParams.search);
      searchUser(newParams.search);
    } else if (role && newParams?.advance) {
      setInput(newParams?.search ?? '');
      setInputLevel2(newParams.advance)
      setAdvanceSearchHasData(true);
      searchUserLevel2(newParams.advance);
    } else {
      getCreatives();
    }
  }, [params, token, subscription_status, role]);

  const getPreviewIndex = () => {
    // let params = new URLSearchParams(window.location.hash.replace("#", ""));
    let slug = params.preview ?? '';
    let index = -1;
    if (slug?.length > 0) {
      index = creatives.findIndex(item => item.slug === slug);
    }
    return index;
  };

  const handleViewPrev = () => {
    let index = getPreviewIndex();
    if (index > 0) {
      // let params = new URLSearchParams(window.location.hash.replace("#", ""));
      // params.set('preview', creatives[index - 1].slug);
      // window.location.hash = params.toString();
      setParams((prev) => ({ ...prev, preview: creatives[index - 1].slug }));
    }
  };

  const handleViewNext = () => {
    let index = getPreviewIndex();
    if (index >= 0 && index < creatives.length - 1) {
      // let params = new URLSearchParams(window.location.hash.replace("#", ""));
      // params.set('preview', creatives[index + 1].slug);
      // window.location.hash = params.toString();
      setParams((prev) => ({ ...prev, preview: creatives[index + 1].slug }));
    }
  };

  useEffect(() => {
    const handleCustomEvent = (data) => {
      if (data?.uid == 'view-profile-actions') {
        document.querySelector('.common-modal-actions-apply-now .slide-prev').style.height = (data?.height || 100) + 'px';
        document.querySelector('.common-modal-actions-apply-now .slide-next').style.height = (data?.height || 100) + 'px';
      }
      // console.log('Received custom event:', data);
    };

    eventEmitter.on('ee_custom_event_height_changed', handleCustomEvent);

    // Cleanup the event listener on component unmount 
    return () => { eventEmitter.off('ee_custom_event_height_changed', handleCustomEvent); };
  }, []);

  return (
    <div className="dark-container mb-0 creatives-directory">
      <div className="container p-md-0 px-5">
        <DelayedOutput>
          <h1 className="community-title text-white text-center mb-4">
            {searchDone ? (inputClicked ? searchDone + " Creatives" : "Search Results") : "Creative Directory"}
          </h1>
        </DelayedOutput>
        {token && (
          <>
            <SearchBar
              input={input}
              setInput={setInput}
              placeholder={creativeSearchPlaceholder}
              onSearch={searchUser}
              role={role}
              advance_search_capabilities={advance_search_capabilities}
              subscription_status={subscription_status}
            />
            {((isAdmin || ((isAdvisor || isAgency) && hasSubscription)) && advanceSearchHasData && which_search() == "search3") && (
              <div className="search-level2">
                {/* <div className="search-title">Search within Results</div> */}
                <SearchBar
                  input={inputLevel2}
                  setInput={setInputLevel2}
                  // placeholder={creativeSearchPlaceholder}
                  placeholder={"Search within results"}
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
          <CommonModal
            dialogClass="common-modal-dialog creatives-search"
            className="agency-page-myjobs tabular dialog creatives-search"
            maxWidth={'md'}
            dialogTitle=""
            dialogTitleStyle={{ textAlign: 'center' }}
            open={openCreativeProfileDialog}
            setOpen={setOpenCreativeProfileDialog}
            onClose={() => {
              // navigate(window.location.pathname);
              setParams((prev) => ({ ...prev, preview: '' }))
            }}
            actions={creatives?.length > 1 ? [
              {
                buttonText: "‹", buttonAction: (e) => {
                  handleViewPrev();
                },
                buttonClass: "slide-prev",
              },
              {
                buttonText: "›", buttonAction: (e) => {
                  handleViewNext();
                },
                buttonClass: "slide-next",
              }
            ] : []}
            actionsClassName="common-modal-actions-apply-now"
          >
            <ViewSearchCreative showButtons={true} previewCreative={previewCreative} />
          </CommonModal>
          {!isCreativeLoading ? (
            <>
              {creatives?.length > 0 &&
                creatives.map((item, index) => {
                  const isShortlisted =
                    bookmarks.find(
                      (bookmark) => bookmark.resource.user_id == item.user_id
                    ) || false;
                  return (
                    <div
                      className="col-md-4 col-sm-6 col-12"
                      key={`creative-${item?.user_id}`}
                    >
                      <div className="sliderContent agencies-slider">
                        {(role == "admin" ||
                          isAgency ||
                          role == "advisor" ||
                          isRecruiter) && (
                            <Tooltip title={"Shortlist"} type="featured">
                              <button
                                className={
                                  "shortlist-btn" +
                                  (isShortlisted ? " active" : "")
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
                        <CreativeImageLoader creative={item} />
                        <div className="agencyName">
                          <Link
                            className="text-dark"
                            to={token ? `/creative/${item.slug}` : "#"}
                            onClick={(e) => {
                              if (!token) {
                                e.preventDefault();
                                showAlert("Please login to access");
                                return false;
                              }

                              return true;
                            }}
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="position">
                          {isAdmin || (isAdvisor && hasSubscription) ? (<>
                            <Link
                              className=""
                              to={`/creatives/search/industry-title/${item.category}`}
                              onClick={(e) => {
                                if (!token) {
                                  e.preventDefault();
                                  showAlert("Please login to access");
                                  return false;
                                }
                                if (isAdvisor && subscription_status != "active") {
                                  e.preventDefault();
                                  showAlert("Post a Job for advance search capabilities");
                                  return false;
                                }
                                return true;
                              }}
                            >
                              {item.category || ""}
                            </Link>
                          </>
                          ) : (
                            <>{item.category || ""}</>
                          )}
                        </div>
                        <CreativeLocation location={item?.location} />
                        <div className="profileLink">
                          <Link
                            onClick={(e) => {
                              if (!token) {
                                e.preventDefault();
                                showAlert("Please login to access");
                              } else {
                                const to = token ?
                                  ((isAdmin || ((isAdvisor || isAgency || isRecruiter) && hasSubscription))
                                    ? setParams((prev) => ({ ...prev, preview: item.slug }))
                                    : navigate(`/creative/${item.slug}`))
                                  : "#";
                              }
                              return false;
                            }}
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
          <div className="load-more text-center">
            {loading && !isCreativeLoading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {creatives && creatives.length === 0 ? (
        <div className="no_result">
          <p style={{ textAlign: 'center' }}>
            <span>Please try again. No exact results found.</span>
            {!isCreative && foundPermission?.advance_search_message?.length > 0 && (
              <>
                <br />
                <span dangerouslySetInnerHTML={{ __html: foundPermission?.advance_search_message }}></span>
              </>
            )}
          </p>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Creatives;
