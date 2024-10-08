import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const RestrictedLounge = () => {

    const [timedLoading, setTimedLoading] = useState(true);
    const [timeoutDelay, setTimeoutDelay] = useState(3000);

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
                                {/* <h4>The Lounge is restricted for Creatives only.</h4> */}
                                {/* <h5>Please login as a Creative to access The Lounge.</h5> */}
                                <h5>A creative login is required for access.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictedLounge;