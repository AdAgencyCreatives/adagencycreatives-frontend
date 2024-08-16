import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import { Context as DataContext } from "../context/DataContext";

const usePermissions = () => {

    const { showAlert } = useContext(AlertContext);

    const {
        state: {
            role,
            user,
            token,
            subscription_status,
            advance_search_capabilities,
        },
    } = useContext(AuthContext);

    const {
        state: { categories_creative_count, },
        getCategoriesCreativeCount,
    } = useContext(DataContext);

    useEffect(() => {
        getCategoriesCreativeCount();
    }, []);

    const isAdmin = role == "admin";
    const isAdvisor = role == "advisor";
    const isAgency = role == "agency";
    const isCreative = role == "creative";
    const isRecruiter = role == "recruiter";
    const hasSubscription = subscription_status == "active";

    const getCategorySearch = (searchTerms) => {
        for (let index = 0; index < searchTerms.length; index++) {
            const element = searchTerms[index];
            for (
                let cccIndex = 0;
                cccIndex < categories_creative_count.length;
                cccIndex++
            ) {
                const cccElement = categories_creative_count[cccIndex];
                if (cccElement.name.toLowerCase() == element.toLowerCase()) {
                    return cccElement;
                }
            }
        }
        return null;
    };

    const build_search_string = (searchTerms, terms_allowed) => {
        return searchTerms.slice(0, terms_allowed).join(",");
    };

    const which_search = () => {
        if (!role) {
            return "search1";
        }

        if (role == "admin" || role == "advisor") {
            return "search3";
        }

        if (
            role == "creative" ||
            ((role == "agency" || role == "recruiter") &&
                subscription_status == "active")
        ) {
            return "search2";
        }

        if (
            (role == "agency" || role == "recruiter") &&
            subscription_status != "active"
        ) {
            return "search1";
        }

        return "search1";
    };

    const proceed_search = (searchString, searchTerms) => {
        // if (!searchString || !searchString.length) {
        //   return { message: "Please enter some text to search", proceed: false, terms_allowed: 0 };
        // }

        if (!role) {
            return {
                message: "It seems you are not logged in",
                proceed: false,
                terms_allowed: 0,
                advance_search_message: "",
            };
        }

        if (role == "admin" || (role == "advisor" && subscription_status == "active")) {
            return { message: "", proceed: true, terms_allowed: searchTerms.length, advance_search_message: "" };
        }

        if (
            (role == "agency" || role == "recruiter") &&
            advance_search_capabilities
        ) {
            return { message: "", proceed: true, terms_allowed: searchTerms.length, advance_search_message: "" };
        }

        if (
            (role == "agency" || role == "recruiter") &&
            subscription_status &&
            subscription_status == "active" &&
            searchTerms.length <= 2
        ) {
            return {
                message: "",
                proceed: true,
                terms_allowed: Math.min(searchTerms.length, 2),
                advance_search_message: ""
            };
        }

        //Special case: If agency does have a subscription status: active but trying to search for more than two terms. e.g.: a,b,c
        if (
            (role == "agency" || role == "recruiter") &&
            subscription_status &&
            subscription_status == "active" &&
            searchTerms.length > 2
        ) {
            return {
                message: "",
                proceed: true,
                terms_allowed: Math.min(searchTerms.length, 2),
                advance_search_message: ""
            };
        }

        let categoryCreativeCount = getCategorySearch(searchTerms);
        let isCategorySearch = categoryCreativeCount != null;

        //Special case: If agency doesn't have a subscription status: active and trying to search for more than one terms. e.g.: a,b
        if (
            (role == "agency" || role == "advisor" || role == "recruiter") &&
            (!subscription_status || subscription_status != "active") &&
            searchTerms.length > 1
        ) {
            // let appendText = isCategorySearch ? "\n<br />Found: (" + categoryCreativeCount.creative_count + ") " + categoryCreativeCount.name : "";
            let appendText = isCategorySearch
                ? "\n<br />Found: " + categoryCreativeCount.name
                : "";
            return {
                message: "Post a Job for advance search capabilities" + appendText,
                proceed: true,
                terms_allowed: Math.min(searchTerms.length, 1),
                advance_search_message: "Post a Job for advance search capabilities."
            };
        }

        //Special case: If agency doesn't have a subscription status: active and trying to search for cateogry
        if (
            (role == "agency" || role == "advisor" || role == "recruiter") &&
            (!subscription_status || subscription_status != "active") &&
            isCategorySearch
        ) {
            // return { message: "Post a Job to view (" + categoryCreativeCount.creative_count + ") " + categoryCreativeCount.name, proceed: true, terms_allowed: Math.min(searchTerms.length, 1) };
            return {
                // message: "Post a Job to view " + categoryCreativeCount.name,
                // message: "Post a Job for advance search feature",
                message: "Post a Job for advance search capabilities",
                proceed: true,
                terms_allowed: Math.min(searchTerms.length, 1),
                advance_search_message: "Post a Job for advance search capabilities."
            };
        }

        return { message: "", proceed: true, terms_allowed: 1, advance_search_message: "" };
    };

    return {
        isAdmin,
        isAdvisor,
        isAgency,
        isCreative,
        isRecruiter,
        hasSubscription,
        build_search_string,
        which_search,
        proceed_search,
    };
}

export default usePermissions;