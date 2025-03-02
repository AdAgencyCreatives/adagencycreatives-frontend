import { useContext, useEffect, useState } from "react";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as ChatContext } from "../context/ChatContext";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { Context as JobsContext } from "../context/JobsContext";
import { Context as DataContext } from "../context/DataContext";

const Caching = () => {

    const {
        state: { user, needsCaching },
        setCachingNeeded,
    } = useContext(AuthContext);

    const { getContacts } = useContext(ChatContext);
    const { getCreativeDashboardStatsCacheOnly, searchAppliedJobs } = useContext(CreativesContext);
    const { getAgencyDashboardStatsCacheOnly, getAgencyByIdCacheOnly, searchOpenPositionsCacheOnly } = useContext(AgenciesContext);
    const { searchApplicationsAllStatusCacheOnly } = useContext(JobsContext);
    const { getCategoriesCreativeCountCacheOnly } = useContext(DataContext);

    useEffect(() => {
        if (user && needsCaching) {
            console.log("Initiating caching...");
            getCategoriesCreativeCountCacheOnly();
            getContacts("job,private");
            if (user.role == 'creative') {
                getCreativeDashboardStatsCacheOnly();
                searchAppliedJobs("");
            } else if (user.role == 'agency' || user.role == 'advisor' || user.role == 'recruiter') {
                getAgencyDashboardStatsCacheOnly();
                getAgencyByIdCacheOnly(user, true);
                searchOpenPositionsCacheOnly("", user.uuid, 1, null, 0, () => { });
                searchApplicationsAllStatusCacheOnly("", user.uuid, 0, 1, false, (foundJobs) => { });
            }
            setCachingNeeded(false);
            console.log("Caching done.");
        }
    }, [user, needsCaching]);

    return (
        <></>
    );
};

export default Caching;
