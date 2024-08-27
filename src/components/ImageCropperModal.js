import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FiSettings } from "react-icons/fi";
import Cropper from 'react-easy-crop'
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

export default function ImageCropperModal({ open, setOpen, field, onCropComplete = false }) {

    const [updatingImage, setUpdatingImage] = useState(false);

    const [selectedCroppedArea, setSelectedCroppedArea] = useState(null);
    const [selectedCroppedAreaPixels, setSelectedCroppedAreaPixels] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleOnCropComplete = (croppedArea, croppedAreaPixels) => {
        setSelectedCroppedArea(croppedArea);
        setSelectedCroppedAreaPixels(croppedAreaPixels);
        //console.log(croppedArea, croppedAreaPixels);
    }

    const handleCancel = (e) => {
        setOpen(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setSelectedCroppedArea(null);
        setSelectedCroppedAreaPixels(null);
    };

    const handleUpdateImage = (e) => {
        setUpdatingImage(true);
        onCropComplete && onCropComplete(selectedCroppedArea, selectedCroppedAreaPixels, () => {
            setUpdatingImage(false);
            setOpen(false);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setSelectedCroppedArea(null);
            setSelectedCroppedAreaPixels(null);
        });
    };

    useEffect(() => {
        if (!open) {
            handleCancel(null);
        }
    }, [open]);

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary w-100 text-uppercase"
                onClick={(e) => setOpen(true)}
            >
                <FiSettings /> Adjust
            </button>
            <Dialog
                open={open}
                onClose={(e) => handleCancel(e)}
                scroll="body"
                fullWidth={true}
                maxWidth={false}
            >
                <DialogTitle style={{ fontWeight: '700' }}>Adjust Image</DialogTitle>
                <DialogContent>
                    <div className='image-cropper-container'>
                        <div className="crop-container">
                            <Cropper
                                image={field?.value || ""}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={handleOnCropComplete}
                                onZoomChange={setZoom}
                                cropSize={{ width: 150, height: 150 }}
                            />
                        </div>
                        <div className="controls">
                            <input
                                type="range"
                                value={zoom}
                                min={0.1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => {
                                    setZoom(e.target.value)
                                }}
                                className="zoom-range"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {updatingImage && (<CircularProgress size={20} />)}
                    <Button className="btn btn-gold hover-dark" onClick={(e) => handleUpdateImage(e)}>UPDATE IMAGE</Button>
                    <Button className="btn btn-dark" onClick={(e) => handleCancel(e)}>CANCEL</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}