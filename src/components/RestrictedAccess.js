import { useEffect, useState } from "react";
import useHelper from "../hooks/useHelper";
import { CircularProgress } from "@mui/material";

const RestrictedAccess = ({ title = "Restricted Access", message = "Login to view this page.", delay = 30000 }) => {

    const [timedLoading, setTimedLoading] = useState(true);
    const [timeoutDelay, setTimeoutDelay] = useState(delay);

    const { capitalize, getAorAn } = useHelper();

    useEffect(() => {
        window.setTimeout(() => {
            setTimedLoading(false);
        }, timeoutDelay);
    }, []);

    return timedLoading ? (
        <div className="dark-container page-community mb-0 mt-4">
            <h1 className="community-title">Please wait</h1>
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

export default RestrictedAccess;