import Popup from 'reactjs-popup'
import { MdDeleteOutline } from "react-icons/md";
import './index.css'

const TaskList = props => {
  const {taskDetailsList,onChangeStatusOfTask,onClickDelteButton} = props 
  
  const {id,task,is_completed} = taskDetailsList 
  const isChecked = is_completed === "false" ? false:true
  const status = is_completed === "false" ? "Pending":"Completed"
  const statusColor = is_completed === "false" ? "red":"green"
  const onChangeStatus = () => {
    onChangeStatusOfTask(id,is_completed)
  }

  const onDeleteTaskTriger = () => {
    onClickDelteButton(id)
  }

  return(
    <li className='li-container-task'>
    <div className='li-sub-container'>
        <input type="checkbox" className='checkbox' onClick={onChangeStatus} checked={isChecked}/>
        <p className='each-task-para'>{task}</p>
    </div>
        <p className={statusColor}>{status}</p>
          <Popup trigger={<button type="button"  className="btn-delete-user">
          <MdDeleteOutline className="delete-icon"/>
          </button>} position="bottom right">
    {close => (
      <div className='bg-container-pop'>
        <p className='para-pop'>Are u sure to delete this task ?</p>
        
        <div className='btn-container-cancell-delte'>
          <button className='btn-cancel-pop' onClick={close}>Cancel</button>
          <button onClick={onDeleteTaskTriger} className='btn-delete-pop'>Delete</button>
        </div>
      </div>
    )}
  </Popup>
    </li>
  )
}

export default TaskList 
