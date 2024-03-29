import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import Task from './Task';


export default function TaskColumn(props) {
  return (


    <Paper elevation={1} sx={{ bgcolor: '#DAE7F0' }} >
      <Box >
        <Typography variant="h2" component="h3">
          {props.name}
        </Typography>
        <Divider orientation="horizontal" flexItem />

        {
          props.taskList.map(taskLoop =>
            <Task key={taskLoop.id} handleTaskEdit={props.handleTaskEdit} task={taskLoop} />
          )
        }
      </Box>
    </Paper>

  );
}
