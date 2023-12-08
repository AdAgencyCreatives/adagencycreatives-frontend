import { useContext, useEffect } from "react";
import { Context } from "../context/AlertContext";
import { IoClose } from "react-icons/io5";

const SlideInMessage = (props) => {

    const {hideAlert} = useContext(Context)

    useEffect(() => {
        if (props.message && props.message.length > 0) {
            const delay = props.message === 'registration-success' ? 20000 : 5000;
            window.setTimeout(function () {
                hideAlert();
            }, (props.delay ? props.delay : delay));
        }
    }, [props.message]);

    if (props.message === 'registration-success') {
        return (
            <div className={"registration-success-message sliding-message" + (props.message && props.message.length > 0 ? ' active' : '')}>
                <div className="close" onClick={() => hideAlert()}><IoClose /></div>
                <p>Hello,</p>
                <p>Thank you for successfully registering.
                You'll receive an email with next steps.</p>
                <p>It could be a few business days for us to verify your
                registration request. Be on the look out for our email.</p>
                <p>In the meantime, enjoy exploring our home page.</p>
                <p>- Ad Agency Creatives</p>
            </div>
        );
    }

    return (
        <div className={"sliding-message" + (props.message && props.message.length > 0 ? ' active' : '')}>{props.message}</div>
    );
};

export default SlideInMessage;