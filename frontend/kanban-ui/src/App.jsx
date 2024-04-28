import { useEffect, useState } from 'react'

import './App.css'
import TaskColumn from './components/TaskColumn'
import { Container, Stack } from '@mui/material'
import TopNav from './components/TopNav'
import TaskForm from './components/TaskForm'
import axios from 'axios'
import TaskColumnForm from './components/TaskColumnForm'
import TitleForm from './components/TitleForm'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ConfirmationDialog } from './components/ConfirmationDialog'


const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1440px'
        },
        maxWidthMd: {
          maxWidth: 320,
        },
        maxWidthLg: {
          maxWidth: '1440px!important',
        },
      },
    },
  }
}
);

function App() {

  const global_url_get_content = globalConfig.url_get_content
  const global_url_save_content = globalConfig.url_save_content

  const [title, setTitle] = useState('my title')

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


  const [taskToDeleteAsked, setTaskToDeleteAsked] = useState({})


  //tasks
  const closeTaskForm = () => {
    setTaskEdited({})
  }

  const editTask = (taskToEdit) => {
    setTaskEdited(taskToEdit)
  }
  const askDeleteTask = (taskAskedToDelete) => {
    setTaskToDeleteAsked(taskAskedToDelete)
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

  const addColumn = () => {
    let newColumn = {
      id: taskColumnList.length + 1,
      name: 'new column',
    }

    let newColumnList = [...taskColumnList]
    newColumnList.push(newColumn)

    setColumnList(newColumnList)

    editColumn(newColumn)


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

  const confirmTaskToDelete = () => {



    let newTaskList = taskList.filter((taskLoop) => taskLoop.id != taskToDeleteAsked.id)

    setTaskList(newTaskList)

    setTaskToDeleteAsked({})
  }

  return (
    <>
      {taskColumnList.length > 0 &&

        <ThemeProvider theme={theme}>

          <Container maxWidth={false} orientation="horizontal" padding={0}>
            <TopNav title={title} handleSave={saveContent} handleTitleEdit={editTitle} handleTaskAdd={addTask} handleColumnAdd={addColumn} />

            <ConfirmationDialog handleOk={confirmTaskToDelete} handleCancel={() => setTaskToDeleteAsked({})} title="Confirmez la suppression" content="Confirmez vous la suppression de cette tache" opened={Object.keys(taskToDeleteAsked).length > 0} />

            <TitleForm opened={Object.keys(titleEdited).length > 0} title={titleEdited.title} handleTitleEdit={editTitle} handleSave={saveEditedTitle} handleClose={closeTitleForm} />

            <TaskColumnForm opened={Object.keys(columnEdited).length > 0} column={columnEdited} handleColumnEdit={editColumn} handleSave={saveEditedColumn} handleClose={closeColumnForm} />
            <TaskForm taskColumnList={taskColumnList} opened={Object.keys(taskEdited).length > 0} task={taskEdited} handleTaskEdit={editTask} handleSave={saveEditedTask} handleClose={closeTaskForm} />
            <Container maxWidth="lg" sx={{ margin: 0, mt: 3, padding: 0 }}>
              <Stack direction="row" spacing={1} padding={0} useFlexGap justifyContent="space-evenly">


                {
                  taskColumnList.map((taskColumnLoop) =>
                    <TaskColumn
                      handleColumnEdit={editColumn}
                      key={taskColumnLoop.id}
                      handleTaskEdit={editTask}
                      handleTaskDelete={askDeleteTask}
                      column={taskColumnLoop}
                      name={taskColumnLoop.name}
                      taskList={taskList.filter(taskLoop => taskLoop.column_id == taskColumnLoop.id)} />)
                }




              </Stack >
            </Container>
          </Container >
        </ThemeProvider>
      }


    </>
  )

}

export default App
