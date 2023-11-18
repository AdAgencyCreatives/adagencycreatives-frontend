import {
    IoTrashOutline,
} from "react-icons/io5";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';
import { Tooltip } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function ConfirmModal(props) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleConfirm = () => {
        if (props.setOpenModal) {
            props.setOpenModal(false);
        } else {
            setOpen(false);
        }

        if (props.onConfirm) {
            props.onConfirm();
        }
    };

    const handleClose = () => {
        if (props.setOpenModal) {
            props.setOpenModal(false);
        } else {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        setOpen(props.openModal ?? false);
    }, [props.openModal]);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>{props.title || "Confirm Delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.message || "Are you sure to delete this?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="btn btn-dark" onClick={handleConfirm}>Confirm</Button>
                    <Button className="btn btn-secondary" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
