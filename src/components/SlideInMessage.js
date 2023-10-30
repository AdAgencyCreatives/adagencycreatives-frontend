import { useEffect } from "react";

const slideInMessageInitialState = { message: "" };

const slideInMessageReducer = (state, action) => {
    switch (action.type) {
        case 'setMessage':
            return { ...state, message: action.message };
        default:
            throw new Error();
    }
};

const SlideInMessage = (props) => {

    useEffect(() => {
        if (props.message && props.message.length > 0) {
            window.setTimeout(function () {
                props.dispatch({ type: 'setMessage', message: '' });
            }, 3000);
        }
    }, [props.message]);

    return (
        <div className={"slide-in-message" + (props.message && props.message.length > 0 ? ' active' : '')}>{props.message}</div>
    );
};

export { slideInMessageInitialState, slideInMessageReducer };
export default SlideInMessage;