import { useContext } from "react";

const useApplicationStatusHelper = () => {

    const getStatusName = (applicationStatus) => {
        let result = "N/A";
        if (applicationStatus == "pending") {
            result = "Pending";
        } else if (applicationStatus == "accepted") {
            result = "Approved";
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
            result += "info";
        } else if (applicationStatus == "accepted") {
            result += "success";
        } else if (applicationStatus == "rejected") {
            result += "danger";
        } else if (applicationStatus == "archived") {
            result += "danger";
        } else if (applicationStatus == "recommended") {
            result += "primary";
        } else if (applicationStatus == "shortlisted") {
            result += "shortlisted";
        } else if (applicationStatus == "hired") {
            result += "primary";
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