import { Box, Card, CardContent, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React from 'react';

export default function TitleForm(props) {

    const updateTitle = (newTitle) => {

        props.handleTitleEdit(newTitle);
    }


    return (

        props.opened &&
        <Modal
            open={props.opened}
            onClose={props.handleSave}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                }}>
                <Card elevation={3}>
                    <CardContent>


                        <Typography id="modal-modal-title" variant="h6" component="h2">

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="my-title">Title</InputLabel>
                                <Input id="my-title" value={props.title} onChange={event => updateTitle(event.target.value)} aria-describedby="my-helper-text" />
                            </FormControl>

                        </Typography>



                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}
