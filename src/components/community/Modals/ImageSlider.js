import { Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageModalStyles from '../../../styles/Modal/ImageModal.scss';
import { CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const ImageSlider = ({ open, setOpen, handleImagePickerClose, postAttachments, selectedIndex = 0 }) => {

    const [images, setImages] = useState(null);

    const {
        state: { token, user },
    } = useContext(AuthContext);

    const getImageAttachments = () => {
        let images = [];
        let imageIndex = 0;
        if (postAttachments?.length > 0) {
            for (let index = 0; index < postAttachments.length; index++) {
                const element = postAttachments[index];
                if (element.resource_type == "post_attachment_image") {
                    images[imageIndex++] = element.url;
                }
            }
        }
        return images;
    };

    useEffect(() => {
        setImages(getImageAttachments());
    }, []);

    useEffect(() => {
        if (open) {
        }
    }, [open]);

    const handleModalClose = (e) => {
        setOpen(false);
        if (handleImagePickerClose) {
            handleImagePickerClose();
        }
    };

    return (
        <Modal
            className="image-picker image-slider"
            open={open}
            onClose={(e) => handleModalClose(e)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="image-upload-modal post-modal">
                <div className="image-picker-header">
                    <h4 className="m-0">Post Images</h4>
                    <div className="modal-close">
                        <IoClose onClick={(e) => handleModalClose(e)} />
                    </div>
                </div>
                <div className="image-picker-body">
                    <div className="slide-container">
                        <Slide autoplay={false} defaultIndex={selectedIndex}>
                            {images?.length > 0 && images.map((item) => (
                                <div className="each-slide-effect">
                                    <div style={{ 'backgroundImage': `url(${item})` }}>
                                    </div>
                                </div>
                            ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ImageSlider;
