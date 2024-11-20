import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonModal from './CommonModal';

const RegistrationSuccessModal = ({ }) => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (window.location.hash == "#registration-success") {
            setOpen(true);
            window.setTimeout(() => {
                handleOnClose();
            }, 200000);
        }
    }, [window.location.hash]);

    const handleOnClose = () => {
        setOpen(false); navigate("/");
    };

    return (
        <CommonModal
            dialogTitle="REQUEST SENT"
            dialogTitleStyle={{ textAlign: 'center' }}
            open={open}
            setOpen={setOpen}
            closeButtonText="Home Page"
            onClose={() => { handleOnClose(); }}
            dialogClass={"dialog-registration-success"}
            actionsClassName="common-modal-actions-apply-now"
            fullWidth={false}
            sx={{ '& .MuiDialog-paper': { position: 'relative', width: '500px', maxWidth: '500px', padding: '30px' } }}
            closeButtonClass="btn btn-dark registration-success"
            closeIconClass="close-modal registration-success"
        >
            <p>Thank you for successfully registering.
                You'll receive an email with next steps.</p>
            <p>It could be a few business days to verify your
                registration request. You'll receive an email when verification is complete.</p>
            <p>In the meantime, enjoy exploring our home page.</p>
            <p>- Ad Agency Creatives</p>
        </CommonModal>
    );
};

export default RegistrationSuccessModal;
