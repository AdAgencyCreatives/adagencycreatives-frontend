import { IoLocationOutline } from "react-icons/io5";

const UserLocation = (props) => {

    const hideIcon = props?.hideIcon ? true : false;

    return (<>
        {(props?.location?.state?.length || props?.location?.city?.length) && (
            <div className="job-location location">
                {!hideIcon && (props?.location?.state?.length || props?.location?.city?.length) && (<IoLocationOutline />)}
                {props?.location?.state?.length && (<>
                    <span>{props?.location?.state}</span>
                </>)}
                {(props?.location?.state?.length && props?.location?.city?.length) && (<span>,&nbsp;</span>)}
                {props?.location?.city?.length && (<>
                    <span>{props?.location?.city}</span>
                </>)}
            </div>
        )}
    </>);
};

export default UserLocation;