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
        className = "agency-page-myjobs tabular dialog",
        actions = [],
        actionsClassName = "common-modal-actions"
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
                style={{ zIndex: 1600 }}
            >
                <DialogTitle style={dialogTitleStyle}>{dialogTitle}</DialogTitle>
                {actions?.length > 0 && (
                    <DialogActions className={actionsClassName}>
                        {actions.map(action => {
                            return (
                                <Button className="btn btn-apply" onClick={(e) => {
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
                        <IoCloseCircleSharp size={30} className="close-modal" onClick={handleOnClose} />
                        {children}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="btn btn-dark" onClick={handleOnClose}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CommonModal;