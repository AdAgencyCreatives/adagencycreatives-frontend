import { useContext, useEffect, useState, useMemo } from "react";
import { getPageData } from "../context/PagesDataContext";
import { useCallback } from "react";

const usePageDataHelper = (currentPage) => {
    const localPageData = JSON.parse(localStorage.getItem(currentPage)) ?? [];

    const getPageDataItem = (key, data) => {
        if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.key == key) {
                    return removeTinyMceParagraph(element.value); // remove tinyMCE added paragraph
                }
            }
        }
        return "";
    }

    const removeTinyMceParagraph = (pageData) => {
        return pageData.indexOf("<p>") == 0 ? pageData.substring("<p>".length, pageData.indexOf("</p>")).trim() : pageData;
    }

    const [page,] = useState(currentPage);
    const [pageData, setPageData] = useState(localPageData);

    useEffect(() => {
        (async () => {
            const data = await getPageData(currentPage);
            setPageData(data);
        })();
    }, []);

    return { page, pageData, getPageDataItem };
}

export default usePageDataHelper;