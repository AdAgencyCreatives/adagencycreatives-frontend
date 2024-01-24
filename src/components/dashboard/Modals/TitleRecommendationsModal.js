import Dialog from "@mui/material/Dialog";
import "../../../styles/Modal/AddNotesModal.scss";
import { useContext, useEffect, useState } from "react";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { usePopupScrollLoader } from "../../../hooks/usePopupScrollLoader";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import TimeAgo from "../../TimeAgo";
import { convertUTCDateToLocalDate } from "../../UtcToLocalDateTime";
import DelayedOutput from "../../DelayedOutput";
import { IoCloseCircleSharp } from "react-icons/io5";
import InfoIconImage from "../../../assets/images/info-icon.png";
import Loader from "../../Loader";

const TitleRecommendationsModal = ({ permission, handleClose }) => {

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        state: { message },
        showAlert,
    } = useContext(AlertContext);

    const {
        state: { categories, },
        getCategories,
    } = useContext(DataContext);

    const {
        state: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        if (open) {
            setIsLoading(true);
            getCategories();
        }
    }, [open, user]);

    useEffect(() => {
        if (open) {
            window.setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [open]);

    const handleClick = (e) => {
        if (permission?.proceed) {
            setOpen(true);
        } else {
            showAlert(permission?.message);
        }
    };

    return (
        <>
            {permission?.visible && (<>
                <img className="title-recommendations" src={InfoIconImage} alt="Title Recommendations" title="Title Recommendations" onClick={(e) => handleClick(e)} />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    scroll="body"
                >
                    <div className="add-note-modal">
                        <div className="addnote-header">
                            <IoCloseCircleSharp className="close-modal" onClick={(e) => setOpen(false)} />
                        </div>
                        <div className="addnote-body">
                            <div className="job-apply-email-form-wrapper">
                                <div className="inner">
                                    <h3 className="text-center">
                                        <span>Title Recommendations</span>
                                    </h3>
                                    {/* <div className="text-center"><em>All the Industry Title Categories</em></div> */}
                                    <div className="notes-list-item">
                                        {categories?.length > 0 ? (
                                            <>

                                                {categories.map((cat) => (
                                                    <div key={cat.id} className="note-item fs-7 title-recommendation-item" onClick={(e) => handleClose(e, { value: cat.name, setOpen: setOpen })}>
                                                        <p className="mb-0">{cat.name}</p>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {isLoading && (<Loader fullHeight={false} />)}
                                                <DelayedOutput delay={2000}>
                                                    <p className="text-center">It seems Title Recommendations aren't available right now.</p>
                                                </DelayedOutput>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </>)}
        </>
    );
};

export default TitleRecommendationsModal;
