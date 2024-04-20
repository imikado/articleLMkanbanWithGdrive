import { AppBar, Box, Button, IconButton, Toolbar, Typography, ButtonGroup } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import React from 'react';

export default function TopNav(props) {
    return (

        <AppBar position="static" sx={{ width: 1 }}>
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                    <IconButton aria-label="edit" onClick={() => props.handleTitleEdit(props.title)}>
                        <EditIcon />
                    </IconButton>
                </Typography>

                <ButtonGroup variant="outlined">
                    <Button startIcon={<AddIcon />} onClick={() => props.handleColumnAdd()} color="inherit">Column</Button>
                    <Button startIcon={<AddIcon />} onClick={() => props.handleTaskAdd()} color="inherit">Task</Button>
                </ButtonGroup>

                <ButtonGroup variant="primary">
                    <Button startIcon={<SaveIcon />} onClick={() => props.handleSave()} color="inherit">Save</Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>

    );
}
