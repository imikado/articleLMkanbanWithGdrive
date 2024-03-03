import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';

import EditIcon from '@mui/icons-material/Edit';

export default function Task(props) {
    return (
        <React.Fragment>
            <Box sx={{ m: 1 }}>
                <Card elevation={3}>
                    <CardContent>

                        <Typography variant="h5" component="div">
                            {props.task.title}
                        </Typography>

                        <Typography variant="body2">
                            {props.task.content}
                        </Typography>
                    </CardContent>
                    <CardActions>


                        <IconButton aria-label="add to favorites" onClick={() => props.handleTaskEdit(props.task)}>
                            <EditIcon />
                        </IconButton>


                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    );
}
