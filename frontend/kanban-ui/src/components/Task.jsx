import { Box, Card, CardActions, CardContent, IconButton, Typography, Grid } from '@mui/material';
import React from 'react';

import Button from '@mui/material/Button';


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { styled } from '@mui/material/styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function Task(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

                        <Grid marginLeft={2} justifyContent="flex" direction="row" spacing={1} >
                            {props.task.tagList &&
                                props.task.tagList.map((tagLoop) =>
                                    <Chip sx={{ marginRight: 1 }} color="primary" label={tagLoop} />)}


                        </Grid>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Button size="small" color='info' onClick={() => {
                                setExpanded(false)
                                props.handleTaskEdit(props.task)
                            }} startIcon={<EditIcon />}>
                                Editer
                            </Button>

                            <Button size="small" color="error" onClick={() => {
                                setExpanded(false)
                                props.handleTaskDelete(props.task)
                            }} startIcon={<DeleteIcon />}>
                                Supprimer
                            </Button>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        </React.Fragment>
    );
}
