import { useState } from 'react'

import './App.css'
import TaskColumn from './components/TaskColumn'
import { Container, Stack } from '@mui/material'
import TopNav from './components/TopNav'
import TaskForm from './components/TaskForm'

function App() {
  const [count, setCount] = useState(0)

  const [title, setTitle] = useState('undefined')

  const [taskColumnList, setColumnList] = useState([
    {
      'id': 'todo',
      'name': 'To do',
    },
    {
      'id': 'running',
      'name': 'In progress',
    },
    {
      'id': 'done',
      'name': 'Done',
    }
  ]);

  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'my task 1',
      content: ' my content',
      column_id: 'running'
    },
    {
      id: 2,
      title: 'my task 2',
      content: ' my content',
      column_id: 'done'
    },
    {
      id: 3,
      title: 'my task 3  ',
      content: ' my content',
      column_id: 'done'
    }
  ]);

  const [taskEdited, setTaskEdited] = useState({})

  const saveTask = () => {

  }
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

  return (
    <>
      <Container maxWidth="lg" orientation="horizontal">
        <TopNav title={title} />
        <TaskForm taskColumnList={taskColumnList} opened={Object.keys(taskEdited).length > 0} task={taskEdited} handleTaskEdit={editTask} handleSave={saveEditedTask} handleClose={closeTaskForm} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Stack direction="row" spacing={3}>


            {
              taskColumnList.map((taskColumnLoop) =>
                <TaskColumn key={taskColumnLoop.id} handleTaskEdit={editTask} name={taskColumnLoop.name} taskList={taskList.filter(taskLoop => taskLoop.column_id == taskColumnLoop.id)} />)
            }
          </Stack >
        </Container>
      </Container>

    </>
  )

}

export default App
