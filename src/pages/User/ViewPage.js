import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";

import PageNotFound from "../../components/PageNotFound";
import ViewProfile from "./ViewProfile";

const ViewPage = () => {
    const { username, type, role_name } = useParams();
    const page = type;

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return <>
        {(page == "creative" || page == "agency" || page == "advisor" || page == "recruiter") ? (
            <ViewProfile />
        ) : (
            <PageNotFound />
        )}
    </>
};

export default ViewPage;
