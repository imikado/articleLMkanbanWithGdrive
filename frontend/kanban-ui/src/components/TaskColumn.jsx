import { Box, Divider, Paper, Typography, IconButton } from '@mui/material';
import React from 'react';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';


export default function TaskColumn(props) {
  return (


    <Paper elevation={1} sx={{ bgcolor: '#DAE7F0', margin:0 }} >
      <Box >
        <Typography variant="h3" component="h4" margin={4} mt={2}>
          {props.name}
          <IconButton aria-label="add to favorites" onClick={() => props.handleColumnEdit(props.column)}>
                            <EditIcon />
                        </IconButton>
        </Typography>

        {
          props.taskList.map(taskLoop =>
            <Task key={taskLoop.id} handleTaskEdit={props.handleTaskEdit} task={taskLoop} />
          )
        }
      </Box>
    </Paper>

  );
}
