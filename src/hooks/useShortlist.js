import { useContext, useEffect, useState } from "react";
import { Context as DataContext } from "../context/DataContext";
import { Context as AlertContext } from "../context/AlertContext";

const useShortlist = (uid, resource_id, type) => {
  const { createBookmark, removeBookmark, checkShortlist } =
    useContext(DataContext);

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [data, setData] = useState([]);

  const {
    state: {},
    showAlert
  } = useContext(AlertContext);

  useEffect(() => {
    checkShortlist(uid, resource_id, type).then((result) => {
      setIsShortlisted(result.length);
      setData(result[0]);
    });
  }, []);

  const shortlistHandler = async () => {
    if (isShortlisted) {
      await removeBookmark(data.id);
      showAlert('Agency deleted from shortlist.');
    } else {
      const result = await createBookmark(uid, type, resource_id);
      if(result){
        setData(result.data);
        showAlert('Agency added to shortlist.');
      }
    }
    setIsShortlisted((prev) => !prev);
  };

  return { isShortlisted, shortlistHandler };
};

export default useShortlist;
