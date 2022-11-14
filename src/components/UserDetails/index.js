import {Component} from 'react'
import Loader from 'react-loader-spinner'
import { BiArrowBack } from "react-icons/bi"
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import TaskList from '../TaskList'
import './index.css'

const constantApiStatus = {
   initial:"INITIAL",
   inProcess:"INPROCESS",
   inSuccess:"INSUCCESS",
   inFailure:"INFAILURE"
}

class UserDetails extends Component {
   state = {taskList:[],apiStatus:constantApiStatus.initial,username:{},showAddTask:false,task:'',showErrorTask:false,taskError:''}
 
   componentDidMount(){
      this.getUsername()
      this.getUserTask()
   }

   onClickDelteButton = async id => {
      const url = `https://safetyconnect.herokuapp.com/task/${id}/`
      const options = {
         method:"DELETE"
      }
     const response =  await fetch(url,options)
     if (response.ok === true){
      this.getUserTask()
     }
   }

   onChangeStatusOfTask = async (id,is_completed) => {
      let statusDetails = null
      if (is_completed === "false"){
       statusDetails = {
         is_completed:"true"
      }
   }else{
       statusDetails = {
         is_completed:"false"
      }
   }
      const url = `https://safetyconnect.herokuapp.com/task/update/${id}/`
      const options = {
         method:"PUT",
         body: JSON.stringify(statusDetails),
         headers: {
           'Content-Type': 'application/json',
           accept: 'application/json',
         },
      }

      const response = await fetch(url,options)
      if (response.ok === true){
         this.getUserTask()
      }
   }
   
   getUsername = async () => {
      const {match} = this.props
      const {params} = match 
      const {id} = params 
      const url = `https://safetyconnect.herokuapp.com/username/${id}/`
      const options = {
         method:"GET"
      }

      const response = await fetch(url,options)
      const data = await response.json()

      this.setState({username:data})
   }

   getUserTask = async () => {
      this.setState({apiStatus:constantApiStatus.inProcess})
      const {match} = this.props
      const {params} = match 
      const {id} = params
      const url = `https://safetyconnect.herokuapp.com/task/user/${id}`
      const options = {
         method:"GET"
      }
      const response = await fetch(url,options)
      const data = await response.json()
      if (response.ok === true){
         this.setState({apiStatus:constantApiStatus.inSuccess,taskList:data})
      }
      else{
         this.setState({apiStatus:constantApiStatus.inFailure})
      }
   }

   onSubmitTaskDetails = async event  => {
      event.preventDefault()
      const {task} = this.state
      const {match} = this.props
      const {params} = match 
      const {id} = params
      const taskDetails = {
         id:uuidv4(),
         user_id:id,
         task:task,
         is_completed:"false"
      }
      const url = "https://safetyconnect.herokuapp.com/tasks/add/"
      const options = {
         method:"POST",
         body: JSON.stringify(taskDetails),
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
      }

      const response = await fetch(url,options)
      if(response.ok === true){
         this.getUserTask()
         this.onCloseAddTask()
      }
      else{
         this.setState({showErrorTask:true,taskError:'task already exists'})
      }

   }

   onClickToShow = () => {
      this.setState({showAddTask:true})
   }

   onCloseAddTask =() => {
      this.setState({showAddTask:false,task:''})
   }

   onChangeTask = event  => {
      this.setState({task:event.target.value})
   }

   renderSuccessViewTask = () => {
      const {username,showAddTask,task,taskError,showErrorTask,taskList} = this.state 

      return(
         <div className='task-container'>
            <div className='name-task-container'>
         <div className='avatar-name-container'>
         <img alt='avatar' src="https://res.cloudinary.com/duv0mhzrm/image/upload/v1665994997/Avatar_hzuzbt.png" className='avatar-resize'/>
          <h1 className='heading'>{username.username} Task List</h1>
          </div>
          <button className='btn-add-task' onClick={this.onClickToShow} type='button'>Add New Task</button>
          </div>
         {showAddTask &&
          <form className='form-container-task' onSubmit={this.onSubmitTaskDetails}>
          <BiArrowBack className='cancel-icon' onClick={this.onCloseAddTask}/>
             <label className="label" htmlFor="task" >Task</label>
             <input placeholder='Enter Task' id="task" value={task} className="input" type="text" onChange={this.onChangeTask} />
             <button className='btn-click' type='submit'>Click</button>
             {showErrorTask && <p className="error-msg">*{taskError}</p>}
          </form>
           }
           <ul className='user-ul-container'>
            {taskList.map(eachTask => (
               <TaskList onChangeStatusOfTask={this.onChangeStatusOfTask} key={eachTask.id} taskDetailsList={eachTask} onClickDelteButton={this.onClickDelteButton}/>
            ))}
           </ul>
         </div>
      )
   }

   renderLoadingViewTask = () => (
      <div className='loading-container'>
      <Loader type="TailSpin" color="#0000ff" height={50} width={50} />
  </div>
      
   )
   renderFailureViewTask = () => (
      <div className='loading-container'>
      <img
      src="https://res.cloudinary.com/duv0mhzrm/image/upload/v1665899171/Background-Complete_wschfx.png"
      alt="failure view"
      className="error-image"
    />
    <p className="error-popular-para">
      Something went wrong, Please try again.
    </p>
    <button
      type="button"
      className="btn-popular"
      onClick={this.getUserTask}
    >
      Try Again
    </button>
    </div>
  )

   renderUserDetailsTask = () => {
      const {apiStatus} = this.state 

        switch(apiStatus) {
            case constantApiStatus.inProcess:
                return this.renderLoadingViewTask()
            case constantApiStatus.inSuccess:
                return this.renderSuccessViewTask()
            case constantApiStatus.inFailure:
                return this.renderFailureViewTask()
            default :
               return null
        }
   }


   render(){
      
      
      return(
         <div className='main-container'>
             <Header/>

           {this.renderUserDetailsTask()}
         </div>
      )
   }
}

export default UserDetails