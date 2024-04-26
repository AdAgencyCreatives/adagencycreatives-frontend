import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Modal } from "@mui/material";


const ImageDialog = ({ image, setImage, open, setOpen }) => {

    useEffect(() => {
    }, []);

    return (
        <Modal
            className="image-dialog"
            open={open}
            onClose={(e) => {
                setOpen(false);
                setImage("");
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="image-container">
                <IoClose className="quit" onClick={(e) => {
                    setOpen(false);
                    setImage("");
                }} />
                <img src={image} />
            </div>
        </Modal>
    );
};

export default ImageDialog;
