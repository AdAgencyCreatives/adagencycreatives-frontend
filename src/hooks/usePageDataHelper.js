import { useContext, useEffect, useState, useMemo } from "react";
import { getPageData } from "../context/PagesDataContext";
import { useCallback } from "react";

const usePageDataHelper = (currentPage) => {
    const pageData =  JSON.parse(localStorage.getItem(currentPage)) ?? [];

    const getPateDataItem = (key, data) => {
        if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.key == key) {
                    return element.value;
                }
            }
        }
        return "";
    }

    const [page,] = useState(currentPage);
    const [pageTitle, setPageTitle] = useState(getPateDataItem("title", pageData) ?? '');
    const [pageSubTitle, setPageSubTitle] = useState(getPateDataItem("sub_title", pageData) ?? '');

    useEffect(() => {
        (async () => {
            const data = await getPageData(currentPage);
            setPageTitle(getPateDataItem("title", data) ?? '');
            setPageSubTitle(getPateDataItem("sub_title", data) ?? '');
        })();
    }, []);

    return { page, pageData, pageTitle, pageSubTitle, getPateDataItem };
}

export default usePageDataHelper;