import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { deleteTaskAPI, getAllTaskAPI, saveTaskAPI } from "./service/allAPI";

function App() {

  const [fetchedTasks, setFetchedTasks] = useState([])

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    deadline: "",
    priorityLevel: "",
    completionStatus: ""
  })
  console.log(taskDetails);

  useEffect(() => {
    getTask()
  }, [])


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUploadTask = async () => {
    const { title, description, deadline, priorityLevel, completionStatus } = taskDetails
    if (title && description && deadline && priorityLevel && completionStatus) {
      try {
        const result = await saveTaskAPI(taskDetails)
        if (result.status >= 200 && result.status < 300) {
          alert('Data added successfully')
          handleClose()
          getTask()
        }
      }
      catch (error) {
        console.log(error);

      }
    }
    else {
      alert('please enter task details')
    }
  }

  const getTask = async () => {
    try {
      const result = await getAllTaskAPI()
      if (result.status >= 200 && result.status < 300) {
        setFetchedTasks(result.data)
      }
    }
    catch (error) {
      console.log(error);

    }
  }

  const removeTask = async (id) => {
    try {
      await deleteTaskAPI(id)
      getTask()
    }
    catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <div className="container p-5 text-center">
        <h3>Todo-List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority level</th>
              <th>Completion Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              fetchedTasks?.length > 0 ?
                fetchedTasks?.map(tasks => (
                  <tr key={tasks.id}>
                    <td>{tasks.title}</td>
                    <td>{tasks.description}</td>
                    <td>{tasks.deadline}</td>
                    <td>{tasks.priorityLevel}</td>
                    <td>{tasks.completionStatus}</td>
                    <td><button onClick={() => removeTask(tasks.id)} className="btn"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>
                ))
                :
                <div>No Tasks to show</div>
            }
          </tbody>
        </table>
        <button onClick={handleShow} className="btn btn-success">Add Task</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingTitle"
              label="Task Tiltle"
              className="mb-3"
            >
              <Form.Control onChange={e => setTaskDetails({ ...taskDetails, title: e.target.value })} type="text" placeholder="Task Title" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control onChange={e => setTaskDetails({ ...taskDetails, description: e.target.value })} type="text" placeholder="Description" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDeadline"
              label="DeadLine"
              className="mb-3"
            >
              <Form.Control onChange={e => setTaskDetails({ ...taskDetails, deadline: e.target.value })} type="date" placeholder="Deadline" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPriority"
              label="Priority Level"
              className="mb-3"
            >
              <Form.Select
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, priorityLevel: e.target.value })
                }
                value={taskDetails.priorityLevel}
              >
                <option value="" selected hidden>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </FloatingLabel>


            <FloatingLabel
              controlId="floatingStatus"
              label="Completion Status"
              className="mb-3"
            >
              <Form.Select
                onChange={e => setTaskDetails({ ...taskDetails, completionStatus: e.target.value })}
                value={taskDetails.completionStatus}
              >
                <option value="" selected hidden>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </Form.Select>
            </FloatingLabel>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadTask} variant="primary">
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
