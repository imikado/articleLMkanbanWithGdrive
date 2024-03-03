import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function TopNav(props) {
    return (

        <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>
                <Button color="inherit">Save</Button>
            </Toolbar>
        </AppBar>

    );
}
