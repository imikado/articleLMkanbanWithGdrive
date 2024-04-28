import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';


export function ConfirmationDialog(props) {

    return (
        props.opened &&


        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"

            open={props.opened}

        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent dividers>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleCancel}>
                    Annuler
                </Button>
                <Button onClick={props.handleOk}>Confirmer</Button>
            </DialogActions>
        </Dialog>

    );
}
