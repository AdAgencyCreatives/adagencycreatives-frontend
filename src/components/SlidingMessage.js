import { useContext, useEffect } from "react";
import { Context } from "../context/AlertContext";

const SlideInMessage = (props) => {

    const {hideAlert} = useContext(Context)

    useEffect(() => {
        if (props.message && props.message.length > 0) {
            const delay = props.message === 'registration-success' ? 20000 : 7000;
            window.setTimeout(function () {
                hideAlert()
            }, (props.delay ? props.delay : delay));
        }
    }, [props.message]);

    if (props.message === 'registration-success') {
        return (
            <div className={"registration-success-message sliding-message" + (props.message && props.message.length > 0 ? ' active' : '')}>
                Hello,<br /><br />
                Thank you for successfully registering.<br />
                You'll receive an email with next steps.<br /><br />
                It could be a few business days for us to verify your<br />
                registration request. Be on the look out for our email.<br /><br />
                In the meantime, enjoy exploring our home page.<br /><br />
                - Ad Agency Creatives
            </div>
        );
    }

    return (
        <div className={"sliding-message" + (props.message && props.message.length > 0 ? ' active' : '')}>{props.message}</div>
    );
};

export default SlideInMessage;