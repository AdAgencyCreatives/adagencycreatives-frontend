import useHelper from "../hooks/useHelper";

const RestrictedAgency = ({ role }) => {

    const { capitalize } = useHelper();

    return (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">Agencies {role}</h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <h5>Please login as an Administrator to access agencies {capitalize(role)}.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictedAgency;