import { Box, Card, CardContent, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import Task from './Task';

export default function TaskForm(props) {

    const updateTitle = (newTitle) => {

        let newTask = { ...props.task }
        newTask.title = newTitle

        props.handleTaskEdit(newTask);
    }
    const updateContent = (newContent) => {

        let newTask = { ...props.task }
        newTask.content = newContent

        props.handleTaskEdit(newTask);
    }

    const handleColumnChange = (event) => {

        let newTask = { ...props.task }
        newTask.column_id = event.target.value

        props.handleTaskEdit(newTask);

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
                                <Input id="my-title" value={props.task.title} onChange={event => updateTitle(event.target.value)} aria-describedby="my-helper-text" />
                            </FormControl>

                        </Typography>

                        <FormControl fullWidth sx={{ m: 1 }}>

                            <TextField id="my-content" rows={10} multiline={true} value={props.task.content} onChange={event => updateContent(event.target.value)} />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-label">Column</InputLabel>
                            <Select

                                value={props.task.column_id}
                                label="Age"
                                onChange={handleColumnChange}
                            >
                                {
                                    props.taskColumnList.map((columnLoop) =>
                                        <MenuItem key={columnLoop.id} value={columnLoop.id}>{columnLoop.name}</MenuItem>
                                    )
                                }

                            </Select>
                        </FormControl>


                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}
