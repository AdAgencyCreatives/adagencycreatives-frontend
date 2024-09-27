import { useEffect, useState } from "react";
import useHelper from "../hooks/useHelper";
import { CircularProgress } from "@mui/material";

const RestrictedUser = ({ title = "Restricted Access", message = "Login to view this page." }) => {

    const [timedLoading, setTimedLoading] = useState(true);
    const [timeoutDelay, setTimeoutDelay] = useState(3000);

    const { capitalize, getAorAn } = useHelper();

    useEffect(() => {
        window.setTimeout(() => {
            setTimedLoading(false);
        }, timeoutDelay);
    }, []);

    return timedLoading ? (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title"></h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <CircularProgress />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">{title}</h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                            <div className="restricted-message">
                                <h5>{message}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictedUser;