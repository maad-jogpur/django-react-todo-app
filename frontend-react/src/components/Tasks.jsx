import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import axiosinstance from '../AxiosInstance'

const Tasks = () => {
  const[user,setUser] = useState('')
  const[tasks,setTasks] = useState([])
  const[loading,setLoading] = useState(false)
  const{isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
  const[inputValue,setInputValue] = useState('')
  const[success,setSuccess] = useState(false)
  const[deleteSuccess,setDeleteSuccess] = useState(false)
  const [editSuccess,setEditSuccess] = useState(false)
  const[editValue,setEditValue] = useState('')
  const[editId, setEditId] = useState('')

  useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('accessToken')
    const currentUser = async () =>{
      try{
        const response = await axiosinstance.get('/current_user/',{headers:{Authorization: `Bearer ${token}`}})
        setUser(response.data)
        setLoading(false)
        
      }catch(error){
        setIsLoggedIn(false)
      }
    }
    currentUser()
  },[])

  useEffect(()=>{
    const fetchTask = async () => {
      
      try {
        const response = await axiosinstance.get(`/tasks_user/${user.id}`)
        setTasks(response.data)
        // console.log('Tasks========>',response.data)
        // console.log('User Tasks========>',tasks.map(task => task.title))
      } catch (error) {
        console.error('Task error==========>',error)
      }
    }

    if(!loading && user.id){
    fetchTask();
    }
  },[user]);

  const handleTaskCompletion = async (Tid) => {
    const tsk = tasks.find(task => task.id === Tid)
    const response = await axiosinstance.put(`/tasks/${tsk.id}/update`,{
    "title":tsk.title,
    "is_completed":!tsk.is_completed,
    "user":user.id
    })
    const updatedTask = tasks.map(task => task.id === Tid? {...task, is_completed: !task.is_completed}: task)
    setTasks(updatedTask)
  }

  const handleAddTask = async () => {
    try {
      const response = await axiosinstance.post('/tasks/post/',{
        user:user.id,
        title:inputValue,
        is_completed:false
      })
      setTasks([...tasks,response.data])
      setSuccess(true)
      setDeleteSuccess(false)
      setEditSuccess(false)
      setInputValue('')
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setSuccess(false)
    }
  }

  const handleTaskDeletion = async (Tid) => {
    const tsk = tasks.find(task => task.id === Tid)
    try {
      const response = axiosinstance.delete(`/tasks/${Tid}/delete`)
      
      const updatedTask = tasks.filter(task => task.id !== tsk.id)
      setTasks(updatedTask)
      setSuccess(false)
      setEditSuccess(false)
      setDeleteSuccess(true)
    } catch (error) {
      setDeleteSuccess(false)
    }
  }

  const handleEditInput =  async (Tid) => {
    const tsk = tasks.find(task => task.id === Tid)
    setEditValue(tsk.title)
    if(editId === Tid){
      setEditId('')
    } else{
      setEditId(Tid)
    }
  }

  const handleEditTask = async (Tid) => {
    const tsk = tasks.find(task => task.id === Tid)
    try {
      const response = await axiosinstance.put(`/tasks/${Tid}/update`,{
        title:editValue,
        user:user.id,
        is_completed:false
      })
      const updatedTask = tasks.map(task => task.id === Tid? {...task, title:editValue} : task)
      setTasks(updatedTask)
      setEditId('')
      setSuccess(false)
      setEditSuccess(true)
      setDeleteSuccess(false)
      console.log(response.data)
    } catch (error) {
      console.error('Error==================>',error)
    }
  }
  return (
    <>

    <div 
      className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
      style={{ background: 'linear-gradient(135deg, #153677, #4e085f)' }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '540px' }}>
        <div className="card-body p-4 p-md-5">
          
          <div className="mb-2">Welcome, {user.username}</div>
          
          {/* Title Section */}
          <div className="d-flex align-items-center mb-4">
            <h2 className="fw-bold mb-0" style={{ color: '#002765' }}>To-do Tasks</h2>
          </div>

          {/* Static Alert */}
          {success && <div className="alert alert-success py-2 px-3 mb-3">Task added!</div>}
          {deleteSuccess && <div className="alert alert-danger py-2 px-3 mb-3">Task deleted!</div>}
          {editSuccess && <div className="alert alert-warning py-2 px-3 mb-3">Task edited!</div>}

          {/* Input Row */}
          <div className="input-group mb-3 bg-light rounded-pill p-1 shadow-sm">
            <input 
              type="text" 
              className="form-control border-0 bg-transparent ps-4" 
              placeholder="Add your tasks" 
              style={{ boxShadow: 'none' }}
              value={inputValue}
              onChange={(e)=>(setInputValue(e.target.value))}
            />
            
            <button onClick={handleAddTask}
              className="btn rounded-pill px-4 fw-bold text-white" 
              style={{ backgroundColor: '#ff5945' }}
            >
              Add
            </button>
          </div>
          
          {/* List Section */}
          <ul className="list-group list-group-flush mt-4">
            

            {/* Active Task 1 */}
            { tasks.map(task => 
              <li key={task.id}  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-2">
              <div className="d-flex align-items-center flex-grow-1"  >
                
                {!task.is_completed? (
                  <>
             
                    <div  onClick={() => handleTaskCompletion(task.id)}  className="me-3 rounded-circle border border-2 d-flex align-items-center justify-content-center" 
                        style={{ width: '24px', height: '24px', backgroundColor: 'transparent', cursor: 'pointer', borderColor: '#ff5945' }}>
                    </div>

                    <span onClick={() => handleTaskCompletion(task.id)} style={{ cursor: 'pointer' }} className="me-2">{task.title}</span>

            
                    {editId === task.id && 

                    <>
                          {/* New Input and Button Section */}
                      <div className="d-flex align-items-center flex-grow-1 ms-2">
                        <input key={task.id}
                          type="text" 
                          className="form-control form-control-sm border-0 bg-light rounded-pill px-3" 
                          placeholder="Update task..."
                          style={{ fontSize: '0.8rem' }}
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        <button  className="btn btn-sm ms-1 rounded-circle d-flex align-items-center justify-content-center"  style={{ backgroundColor: '#ff5945', color: 'white', width: '28px', height: '28px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTask(task.id);
                          }}>

                          <small>ok</small>
                        </button>
                      </div>
                    </>
                    
                    }
                    

                  </>
                ): (
                  <>
             
                      <div  className="me-3 rounded-circle border border-2 d-flex align-items-center justify-content-center" style={{  width: '24px', height: '24px',  backgroundColor: '#ff5945', borderColor: '#ff5945' }}>
                      <span onClick={() => handleTaskCompletion(task.id)} style={{ cursor: 'pointer' }}  className="text-white small">✓</span>
                      </div>
                      <span onClick={() => handleTaskCompletion(task.id)} style={{ cursor: 'pointer' }} className="text-decoration-line-through text-muted"> {task.title} </span>
             
                  </>
                )}
                
                
              </div>

              <span className="badge rounded-pill bg-light text-dark p-2" onClick={() => handleEditInput(task.id)} style={{ cursor: 'pointer' }}>&#9998;</span>
              &nbsp;
              &nbsp;
              <span className="badge rounded-pill bg-light text-dark p-2" onClick={() => handleTaskDeletion(task.id)} style={{ cursor: 'pointer' }}>✕</span>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Tasks