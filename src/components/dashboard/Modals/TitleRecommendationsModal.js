import Dialog from "@mui/material/Dialog";
import "../../../styles/Modal/AddNotesModal.scss";
import { useContext, useEffect, useState } from "react";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { usePopupScrollLoader } from "../../../hooks/usePopupScrollLoader";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import TimeAgo from "../../TimeAgo";
import { convertUTCDateToLocalDate } from "../../UtcToLocalDateTime";
import DelayedOutput from "../../DelayedOutput";
import { IoCloseCircleSharp } from "react-icons/io5";

const TitleRecommendationsModal = ({ open, setOpen, handleClose }) => {

    const {
        state: { categories, },
        getCategories,
    } = useContext(DataContext);

    const {
        state: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        if (open && user) {
            getCategories();
        }
    }, [open, user]);

    useEffect(() => {
    }, [open]);

    return (
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
                            <div className="text-center"><em>All the Industry Title Categories</em></div>
                            <div className="notes-list-item">
                                {categories?.length > 0 ? (
                                    <>

                                        {categories.map((cat) => (
                                            <div key={cat.id} className="note-item fs-7 title-recommendation-item" onClick={(e)=> handleClose(e, cat)}>
                                                <p className="mb-0">{cat.name}</p>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <DelayedOutput delay={2000}>
                                        <p>You currently have no Industry Title Categories.</p>
                                    </DelayedOutput>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default TitleRecommendationsModal;
