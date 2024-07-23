import { useContext } from "react";

const useApplicationStatusHelper = () => {

    const getStatusName = (applicationStatus) => {
        let result = "N/A";
        if (applicationStatus == "pending") {
            result = "Pending";
        } else if (applicationStatus == "accepted") {
            result = "Interested";
        } else if (applicationStatus == "rejected") {
            result = "Not Aligned";
        } else if (applicationStatus == "archived") {
            result = "Removed";
        } else if (applicationStatus == "recommended") {
            result = "Recommended";
        } else if (applicationStatus == "shortlisted") {
            result = "Shortlisted";
        } else if (applicationStatus == "hired") {
            result = "Hired";
        }
        return result;
    };

    const getStatusBadge = (applicationStatus) => {
        let result = "badge bg-";
        if (applicationStatus == "pending") {
            result += "pending";
        } else if (applicationStatus == "accepted") {
            result += "interested";
        } else if (applicationStatus == "rejected") {
            result += "not-aligned";
        } else if (applicationStatus == "archived") {
            result += "not-aligned";
        } else if (applicationStatus == "recommended") {
            result += "recommended";
        } else if (applicationStatus == "shortlisted") {
            result += "shortlisted";
        } else if (applicationStatus == "hired") {
            result += "hired";
        } else {
            result += "secondary";
        }
        return result;
    };

    return {
        getStatusName,
        getStatusBadge
    };
}

export default useApplicationStatusHelper;