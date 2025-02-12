import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const InfoModal = ({ isOpen, onRequestClose, title, content }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
        >
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton onClick={onRequestClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box mt={2}>
                    <Typography id="modal-content" variant="body1">
                        {content}
                    </Typography>
                </Box>
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="secondary" onClick={onRequestClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InfoModal;