import { useContext, useEffect, useState, useMemo } from "react";
import { getPageData } from "../context/PagesDataContext";
import { useCallback } from "react";

const usePageDataHelper = (currentPage) => {
    const localPageData =  JSON.parse(localStorage.getItem(currentPage)) ?? [];

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

    const getPateDataItemStripped = (key, data) => {
        let pageData = getPateDataItem(key, data);
        pageData = pageData.replace("<p>", "");
        pageData = pageData.replace("</p>", "");
        pageData = pageData.trim();

        return pageData;
    }

    const [page,] = useState(currentPage);
    const [pageData, setPageData] = useState(localPageData);

    useEffect(() => {
        (async () => {
            const data = await getPageData(currentPage);
            setPageData(data);
        })();
    }, []);

    return { page, pageData, getPateDataItem, getPateDataItemStripped };
}

export default usePageDataHelper;