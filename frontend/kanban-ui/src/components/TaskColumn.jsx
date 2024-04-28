import { Box, Divider, Paper, Typography, IconButton, Button } from '@mui/material';
import React from 'react';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';


export default function TaskColumn(props) {
  return (


    <Paper elevation={1} sx={{ bgcolor: '#DAE7F0', margin: 0, width: "100%" }} >
      <Box sx={{ padding: 1 }}>
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <Button variant="text" size="large" endIcon={<EditIcon />} sx={{ padding: 2 }} onClick={() => props.handleColumnEdit(props.column)}> {props.name}</Button>
        </Box>

        {
          props.taskList.map(taskLoop =>
            <Task
              key={taskLoop.id}
              handleTaskEdit={props.handleTaskEdit}
              handleTaskDelete={props.handleTaskDelete}
              task={taskLoop} />
          )
        }
      </Box>
    </Paper>

  );
}
