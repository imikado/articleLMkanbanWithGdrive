import { useEffect, useState } from 'react'

import './App.css'
import TaskColumn from './components/TaskColumn'
import { Container, Stack } from '@mui/material'
import TopNav from './components/TopNav'
import TaskForm from './components/TaskForm'
import axios from 'axios'
import TaskColumnForm from './components/TaskColumnForm'
import TitleForm from './components/TitleForm'

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
      taskList: taskList,
      title: title
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
      setTitle(data?.data.title);
    });
  }, []);

  const [taskEdited, setTaskEdited] = useState({})
  const [columnEdited, setColumnEdited] = useState({})
  const [titleEdited, setTitleEdited] = useState({})



  //tasks
  const closeTaskForm = () => {
    setTaskEdited({})
  }

  const editTask = (taskToEdit) => {
    setTaskEdited(taskToEdit)
  }

  const addTask = () => {
    let newTask = {
      id: taskList.length + 1,
      title: 'new title',
      content: 'my desc'
    }

    let newTaskList = [...taskList]
    newTaskList.push(newTask)

    setTaskList(newTaskList)

    editTask(newTask)
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

  const editColumn = (columnToEdit) => {
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

  const editTitle = (newTitle) => {
    setTitleEdited({ title: newTitle })
  }

  const saveEditedTitle = () => {
    setTitle(titleEdited.title)

    setTitleEdited({})
  }

  const closeTitleForm = () => {
    setTitleEdited({})
  }

  return (
    <>
      {taskColumnList.length > 0 &&
        <Container maxWidth="lg" orientation="horizontal" padding={0}>
          <TopNav title={title} handleSave={saveContent} handleTitleEdit={editTitle} handleTaskAdd={addTask} />

          <TitleForm opened={Object.keys(titleEdited).length > 0} title={titleEdited.title} handleTitleEdit={editTitle} handleSave={saveEditedTitle} handleClose={closeTitleForm} />

          <TaskColumnForm opened={Object.keys(columnEdited).length > 0} column={columnEdited} handleColumnEdit={editColumn} handleSave={saveEditedColumn} handleClose={closeColumnForm} />
          <TaskForm taskColumnList={taskColumnList} opened={Object.keys(taskEdited).length > 0} task={taskEdited} handleTaskEdit={editTask} handleSave={saveEditedTask} handleClose={closeTaskForm} />
          <Container maxWidth="lg" sx={{ margin: 0, mt: 3, padding: 0 }}>
            <Stack direction="row" spacing={3} padding={0}>


              {
                taskColumnList.map((taskColumnLoop) =>
                  <TaskColumn handleColumnEdit={editColumn} key={taskColumnLoop.id} handleTaskEdit={editTask} column={taskColumnLoop} name={taskColumnLoop.name} taskList={taskList.filter(taskLoop => taskLoop.column_id == taskColumnLoop.id)} />)
              }




            </Stack >
          </Container>
        </Container >
      }


    </>
  )

}

export default App
