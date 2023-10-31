import { useEffect } from "react";

const SlideInMessage = (props) => {

    useEffect(() => {
        if (props.message && props.message.length > 0) {
            window.setTimeout(function () {
                props.setMessage('');
            }, 3000);
        }
    }, [props.message]);

    return (
        <div className={"slide-in-message" + (props.message && props.message.length > 0 ? ' active' : '')}>{props.message}</div>
    );
};

export default SlideInMessage;