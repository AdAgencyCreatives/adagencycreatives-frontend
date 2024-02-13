import useHelper from "../hooks/useHelper";

const PageNotFound = ({ role }) => {

    const { capitalize } = useHelper();
    
    return (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">Page Not Found</h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <h5>It seems that, either the URL is broken or the page has been moved to the new URL.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;