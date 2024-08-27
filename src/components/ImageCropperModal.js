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

export default function ImageCropperModal({ open, setOpen, field }) {

    const [image, setImage] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [selectedCroppedArea, setSelectedCroppedArea] = useState(null);
    const [selectedCroppedAreaPixels, setSelectedCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setSelectedCroppedArea(croppedArea);
        setSelectedCroppedAreaPixels(croppedAreaPixels);

        console.log(croppedArea, croppedAreaPixels);
    }

    const handleCancel = (e) => {
        setOpen(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setSelectedCroppedArea(null);
        setSelectedCroppedAreaPixels(null);
    };

    const handleUpdateImage = (e) => {
        cropImage(image, selectedCroppedAreaPixels, console.log).then((image) => {
            setCroppedImage(image);
        });
    };

    useEffect(() => {
        if (!open) {
            handleCancel(null);
        } else {
            setImage([field?.value]);
        }
    }, [open]);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    // Copy from "https://codesandbox.io/s/react-easy-crop-demo-with-cropped-output-q8q1mnr01w?from-embed=&file=/src/cropImage.js:0-2289"
    async function getCroppedImg(imageSrc, pixelCrop) {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );
        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
            Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
        );

        return canvas.toDataURL("image/jpeg");
    }

    const cropImage = async (image, croppedAreaPixels, onError) => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            return croppedImage;
        } catch (err) {
            onError(err);
        }
    };


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
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="controls">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
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
                    {croppedImage && <img src={croppedImage} alt="blab" />}
                </DialogContent>
                <DialogActions>
                    <Button className="btn btn-gold hover-dark" onClick={(e) => handleUpdateImage(e)}>UPDATE IMAGE</Button>
                    <Button className="btn btn-dark" onClick={(e) => handleCancel(e)}>CANCEL</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}