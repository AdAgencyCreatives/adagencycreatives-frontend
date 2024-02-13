import useHelper from "../hooks/useHelper";

const NotFound = ({ heading, content }) => {

    const { capitalize } = useHelper();

    return (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">{heading?.length ? heading : "Not Found"}</h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <h5 dangerouslySetInnerHTML={{ __html: content?.length ? content : "Sorry, nothing here." }}></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;