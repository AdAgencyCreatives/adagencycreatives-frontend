import { useContext, useEffect, useState } from "react";
import { Context as DataContext } from "../context/DataContext";

const useShortlist = (uid, resource_id, type) => {
  const { createBookmark, removeBookmark, checkShortlist } =
    useContext(DataContext);

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    checkShortlist(uid, resource_id, type).then((result) => {
      setIsShortlisted(result.length);
      setData(result[0]);
    });
  }, []);

  const shortlistHandler = async () => {
    console.log(data)
    if (isShortlisted) {
      await removeBookmark(data.id);
    } else {
      const result = await createBookmark(uid, type, resource_id);
      if(result){
        setData(result.data)
      }
    }
    setIsShortlisted((prev) => !prev);
  };

  return { isShortlisted, shortlistHandler };
};

export default useShortlist;
