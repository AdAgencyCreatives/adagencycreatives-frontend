import { useContext, useEffect, useState } from "react";
import { getPageData } from "../context/PagesDataContext";

const usePageDataHelper = (currentPage) => {

    const [page, setPage] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [pageTitle, setPageTitle] = useState("");
    const [pageSubTitle, setPageSubTitle] = useState("");

    useEffect(() => {
        (async () => {
            setPage(currentPage);
            setPageData(await getPageData(currentPage));
        })();
    }, []);

    useEffect(() => {
        if (pageData && pageData.length) {
            setPageTitle(getPateDataItem("title"));
            setPageSubTitle(getPateDataItem("sub_title"));
        }
    }, [pageData]);

    const getPateDataItem = (key) => {
        for (let index = 0; index < pageData.length; index++) {
            const element = pageData[index];
            if (element.key == key) {
                return element.value;
            }
        }

        return "";
    }

    return { page, pageData, pageTitle, pageSubTitle, getPateDataItem };
}

export default usePageDataHelper;