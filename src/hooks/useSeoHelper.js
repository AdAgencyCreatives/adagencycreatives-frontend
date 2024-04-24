import { useContext, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useSeoHelper = () => {

    const setDefaultSeo = () => {
        document.getElementsByTagName('meta')["keywords"].content = "Ad Agency Creatives";
        document.getElementsByTagName('meta')["description"].content = "Ad Agency Creatives is a community for advertising creatives.";
        document.title = "Ad Agency Creatives is a community for advertising creatives.";
    };

    const location = useLocation();

    useLayoutEffect(() => {
        setDefaultSeo();
    }, [location]);

    const changeSeoKeywords = (content) => {
        document.getElementsByTagName('meta')["keywords"].content = content;
    };

    const changeSeoDescription = (content) => {
        document.getElementsByTagName('meta')["description"].content = content;
    };

    const changeSeoTitle = (content) => {
        document.title = content;
    };

    const changeSeo = (key, content) => {
        if (key == 'keywords') {
            changeSeoKeywords(content);
        } else if (key == 'description') {
            changeSeoDescription(content);
        } else if (key == 'title') {
            changeSeoTitle(content);
        }
    };

    return { setDefaultSeo, changeSeo };
}

export default useSeoHelper;