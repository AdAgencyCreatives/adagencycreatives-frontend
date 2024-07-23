import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useHistoryState = (key, initialValue) => {
    const location = useLocation()
    const [rawState, rawSetState] = useState(() => {
        const value = window.history.state?.["" + key]
        return value ?? initialValue
    })
    function setState(value) {
        let newState = window.history.state;
        newState["" + key] = value;
        window.history.pushState(newState, location.pathname)
        rawSetState(value)
    }
    return [rawState, setState]
};