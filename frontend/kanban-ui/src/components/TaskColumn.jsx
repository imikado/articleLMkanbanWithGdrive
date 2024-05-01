import { Box, Divider, Paper, Typography, IconButton, Button } from '@mui/material';
import React from 'react';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';


export default function TaskColumn(props) {
  return (


    <Paper elevation={1} sx={{ bgcolor: '#4CD974', margin: 0, width: "100%" }} >
      <Box sx={{ padding: 1 }}>

        <Paper elevation={0} sx={{ marginBottom: 2, bgcolor: "#bdffbd", padding: 1, textAlign: "center" }}>
          <Box sx={{ padding: 1, textAlign: "center" }}>
            <Typography variant="h4" color="primary" component="div">
              {props.name}             <Button variant="text" size="large" endIcon={<EditIcon />} sx={{ padding: 2 }} onClick={() => props.handleColumnEdit(props.column)}></Button>

            </Typography>
          </Box>
        </Paper>

        {
          props.taskList.map(taskLoop =>
            <Task
              taskToDeleteAsked={props.taskToDeleteAsked}
              key={taskLoop.id}
              handleTaskEdit={props.handleTaskEdit}
              handleTaskDelete={props.handleTaskDelete}
              task={taskLoop} />
          )
        }
      </Box >
    </Paper >

  );
}
