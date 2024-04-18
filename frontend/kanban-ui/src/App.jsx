import { useEffect, useState } from 'react'

import './App.css'
import TaskColumn from './components/TaskColumn'
import { Container, Stack } from '@mui/material'
import TopNav from './components/TopNav'
import TaskForm from './components/TaskForm'
import axios from 'axios'
import TaskColumnForm from './components/TaskColumnForm'

function App() {

  const global_url_get_content = globalConfig.url_get_content
  const global_url_save_content = globalConfig.url_save_content

  const [title, setTitle] = useState('undefined')

  const [taskColumnList, setColumnList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const saveContent = () => {
    axios.post(global_url_save_content, {
      columnList: taskColumnList,
      taskList: taskList
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  
  useEffect(() => {
    axios.get(global_url_get_content).then((data) => {
      console.log(data);
      setColumnList(data?.data.columnList);
      setTaskList(data?.data.taskList);

    });
  }, []);

  const [taskEdited, setTaskEdited] = useState({})
  const [columnEdited, setColumnEdited] = useState({})

  //tasks
  const closeTaskForm = () => {
    setTaskEdited({})
  }

  const editTask = (taskToEdit) => {
    setTaskEdited(taskToEdit)
  }

  const saveEditedTask = () => {

    let newTaskList = taskList.map(taskLoop => {
      if (taskLoop.id == taskEdited.id) {
        return { ...taskEdited }

      }
      return taskLoop
    })

    setTaskList(newTaskList)

    setTaskEdited({})
  }

  //columns
  const closeColumnForm = () => {
    setColumnEdited({})
  }

  const editColumn =(columnToEdit)=>{
    setColumnEdited(columnToEdit)
  }

  const saveEditedColumn = () => {

    let newColumnList = taskColumnList.map(columnLoop => {
      if (columnLoop.id == columnEdited.id) {
        return { ...columnEdited }

      }
      return columnLoop
    })

    setColumnList(newColumnList)

    setColumnEdited({})
  }

  return (
    <>
      {taskColumnList.length > 0 &&
        <Container maxWidth="lg" orientation="horizontal" padding={0}>
          <TopNav title={title} handleSave={saveContent} />
          
          <TaskColumnForm opened={Object.keys(columnEdited).length > 0} column={columnEdited} handleColumnEdit={editColumn} handleSave={saveEditedColumn} handleClose={closeColumnForm}  />
          <TaskForm taskColumnList={taskColumnList} opened={Object.keys(taskEdited).length > 0} task={taskEdited} handleTaskEdit={editTask} handleSave={saveEditedTask} handleClose={closeTaskForm} />
          <Container maxWidth="lg" sx={{ margin:0,  mt: 3, padding:0 }}>
            <Stack direction="row" spacing={3} padding={0}>


              {
                taskColumnList.map((taskColumnLoop) =>
                  <TaskColumn handleColumnEdit={editColumn}  key={taskColumnLoop.id} handleTaskEdit={editTask} column={taskColumnLoop} name={taskColumnLoop.name} taskList={taskList.filter(taskLoop => taskLoop.column_id == taskColumnLoop.id)} />)
              }




            </Stack >
          </Container>
        </Container >
      }
     

    </>
  )

}

export default App
