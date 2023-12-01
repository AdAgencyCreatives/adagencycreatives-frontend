const RestrictedLounge = () => {

    return (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">The Lounge</h1>
            <h2 className="community-subtitle">
                Creatives only. Ask for help. Share. Chat.
                Inspire. Tell jokes.
            </h2>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <h4>The Lounge is restricted for creatives only.</h4>
                                <h5>Please login as a creative to access the lounge.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictedLounge;