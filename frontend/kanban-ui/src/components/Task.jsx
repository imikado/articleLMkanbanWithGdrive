import { Box, Card, CardActions, CardContent, IconButton, Typography, Grid } from '@mui/material';
import React from 'react';

import Button from '@mui/material/Button';


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function Task(props) {

    const backgroundColor = () => {
        return props.taskToDeleteAsked.id == props.task.id ? '#fcbacb' : '#fff'
    }

    return (
        <React.Fragment>
            <Box sx={{ m: 1 }}>
                <Card elevation={3} sx={{ bgcolor: backgroundColor() }}>
                    <CardContent>

                        <Typography variant="h5" color="#333" component="div">
                            <AddTaskIcon sx={{ marginRight: 1, color: "#444" }} />
                            {props.task.title}
                        </Typography>

                        <Box sx={{ marginLeft: 2, marginTop: 2, color: "#444" }}>
                            <Typography variant="body" className="display-linebreak" >
                                {props.task.content}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions disableSpacing
                        sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            p: 1,
                        }}>



                        <Button size="small" color='info' onClick={() => props.handleTaskEdit(props.task)} startIcon={<EditIcon />}>
                            Editer
                        </Button>

                        <Button size="small" color="error" onClick={() => props.handleTaskDelete(props.task)} startIcon={<DeleteIcon />}>
                            Supprimer
                        </Button>


                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    );
}
