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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function MessageModal(props) {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClose = () => {
        if (props.setOptions) {
            props.setOptions({...props.options, "open": false});
        }
    };

    return (
        <React.Fragment>
            <Dialog
                className={"message-modal " + props.options.type}
                open={props.options.open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>{props.options.title || "Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.options.message || "An error occured."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="btn btn-dark" onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
