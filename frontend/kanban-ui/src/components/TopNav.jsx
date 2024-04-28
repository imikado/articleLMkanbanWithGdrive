import { AppBar, Box, Button, IconButton, Toolbar, Typography, ButtonGroup } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AddTaskIcon from '@mui/icons-material/AddTask';

import Logo from "../assets/logo_32x32.png";


import React from 'react';

export default function TopNav(props) {
    return (

        <AppBar position="static" sx={{ width: 1 }}>
            <Toolbar>

                <Box
                    marginRight={2}
                    component="img"
                    sx={{
                        height: 32,
                    }}
                    alt="Dupot kanban"
                    src={Logo}
                />



                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        marginRight: 4
                    }}
                >
                    Dupot Kanban
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                    <IconButton aria-label="edit" onClick={() => props.handleTitleEdit(props.title)}>
                        <EditIcon />
                    </IconButton>
                </Typography>

                <ButtonGroup variant="outlined">
                    <Button startIcon={<ViewColumnIcon />} onClick={() => props.handleColumnAdd()} color="inherit">Colonne</Button>
                    <Button startIcon={<AddTaskIcon />} onClick={() => props.handleTaskAdd()} color="inherit">Tâche</Button>
                </ButtonGroup>

                <ButtonGroup variant="primary">
                    <Button startIcon={<SaveIcon />} onClick={() => props.handleSave()} color="inherit">Sauvegarder</Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>

    );
}
