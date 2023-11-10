import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../context/AlertContext";

const SlideInMessage = (props) => {

    const {hideAlert} = useContext(Context)

    useEffect(() => {
        if (props.message && props.message.length > 0) {
            window.setTimeout(function () {
                hideAlert()
            }, (props.delay ? props.delay : 4000));
        }
    }, [props.message]);

    return (
        <div className={"sliding-message" + (props.message && props.message.length > 0 ? ' active' : '')}>{props.message}</div>
    );
};

export default SlideInMessage;