import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {
    IoCloseCircleSharp,
} from "react-icons/io5";

const CommonModal = (
    {
        children,
        open = false,
        setOpen = false,
        onClose = false,
        fullWidth = true,
        maxWidth = false,
        dialogTitle = "",
        dialogTitleStyle = { fontWeight: '700' },
        dialogContentText = "",
        dialogClass = "common-modal-dialog",
        className = "agency-page-myjobs tabular dialog",
        actions = [],
        actionsClassName = "common-modal-actions",
        closeButtonText = "CLOSE",
        closeButtonClass = "btn btn-dark",
        sx = false,
        closeIconClass = "close-modal"
    }) => {

    const handleOnClose = (callbackOnClose = false) => {
        setOpen && setOpen(false);
        onClose && onClose();
        callbackOnClose && typeof callbackOnClose === "function" && callbackOnClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleOnClose}
                scroll="body"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                style={{ zIndex: 1299 }}
                sx={sx}
                className={dialogClass}
            >
                <DialogTitle style={dialogTitleStyle}>{dialogTitle}</DialogTitle>
                {actions?.length > 0 && (
                    <DialogActions className={actionsClassName}>
                        {actions.map(action => {
                            return (
                                <Button className={"btn " + (action?.buttonClass?.length > 0 ? action.buttonClass : 'btn-apply')} onClick={(e) => {
                                    if (action?.invokeOnClose) {
                                        handleOnClose(action?.buttonAction);
                                    } else {
                                        action?.buttonAction && action?.buttonAction(e);
                                    }
                                }}>{action?.buttonText}</Button>
                            );
                        })}
                    </DialogActions>
                )}
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    <div className={className}>
                        <IoCloseCircleSharp size={30} className={closeIconClass} onClick={handleOnClose} />
                        {children}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className={closeButtonClass} onClick={handleOnClose}>{closeButtonText}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CommonModal;