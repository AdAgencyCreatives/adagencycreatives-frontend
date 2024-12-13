import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import useHelper from "../hooks/useHelper";
import { useContext } from "react";
import usePermissions from "../hooks/usePermissions";

const CreativeLocation = (props) => {

    const hideIcon = props?.hideIcon ? true : false;

    const { state: { token, user, subscription_status } } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const { encodeSpecial, decodeSpecial } = useHelper();

    const {
        isAdmin,
        isAdvisor,
        isAgency,
        isCreative,
        isRecruiter,
        hasSubscription,
    } = usePermissions();

    return (<>
        {(props?.location?.state?.length || props?.location?.city?.length) && (
            <div className="job-location location">
                {!hideIcon && (props?.location?.state?.length || props?.location?.city?.length) && (<IoLocationOutline />)}
                {props?.location?.state?.length && (<>
                    {(isAdmin || (isAdvisor && hasSubscription)) ? (
                        <Link
                            to={`/creatives/location/state/${encodeSpecial(encodeURI(props?.location?.state))}`}
                            onClick={(e) => {
                                if (!token || !user?.role) {
                                    e.preventDefault();
                                    showAlert("Please login to access");
                                    return false;
                                }
                                if (user?.role != 'admin' && (!subscription_status || subscription_status != 'active')) {
                                    e.preventDefault();
                                    showAlert("Post a Job for advance search capabilities");
                                    return false;
                                }
                                return true;
                            }}
                        >
                            {props?.location?.state}
                        </Link>
                    ) : (<>
                        <span>{props?.location?.state}</span>
                    </>)}
                </>)}
                {(props?.location?.state?.length && props?.location?.city?.length) && (<span>,&nbsp;</span>)}
                {props?.location?.city?.length && (<>
                    {(isAdmin || (isAdvisor && hasSubscription)) ? (
                        <Link
                            to={`/creatives/location/city/${encodeSpecial(encodeURI(props?.location?.city))}`}
                            onClick={(e) => {
                                if (user?.role != 'admin' && (!subscription_status || subscription_status != 'active')) {
                                    e.preventDefault();
                                    showAlert("Post a Job for advance search capabilities");
                                    return false;
                                }
                                return true;
                            }}
                        >
                            {props?.location?.city}
                        </Link>
                    ) : (<>
                        <span>{props?.location?.city}</span>
                    </>)}
                </>)}
            </div>
        )}
    </>);
};

export default CreativeLocation;