import {Component} from 'react'
import { BiArrowBack } from "react-icons/bi"
import Loader from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import UserList from '../UserList'
import './index.css'
const constantApiStatus = {
    initial:"INITIAL",
    inProcess:"INPROCESS",
    inSuccess:"INSUCCESS",
    inFailure:"INFAILURE"
}

class Home extends Component{
    state = {isShowAddUser:false,username:'',error:'' , isErrorShow:false,listOfUsers:[],apiStatus:constantApiStatus.initial}

    componentDidMount(){
        this.getUserList()
    }
   
    
    getUserList = async() => {
        this.setState({apiStatus:constantApiStatus.inProcess})
        const url = 'https://safetyconnect.herokuapp.com/users/'
        const options = {
            method:'GET'
        }

        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok === true){
            this.setState({listOfUsers:data,apiStatus:constantApiStatus.inSuccess})
        }
        else{
            this.setState({apiStatus:constantApiStatus.inFailure})
        }
        
    }

    onSubmitUsername = async event => {
        event.preventDefault()
        const{username} = this.state
        const url = 'https://safetyconnect.herokuapp.com/users/add/'
        const userDetails = {
            id:uuidv4(),
            username:username,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
        }
        if (username !== ''){
            const response = await fetch(url,options)
            if (response.ok === false){
                this.setState({error:"User already exists",isErrorShow:true})
            }
            else{
                
                this.onCloseAddUserColumn()
                this.getUserList()
            }
        }else{
            this.setState({error:"Username should not empty value",isErrorShow:true}) 
        }

    }
   
    onClickUserColum = () => {
        this.setState({isShowAddUser:true})
    }

    onCloseAddUserColumn = () => {
        this.setState({isShowAddUser:false,username:''})
    }

    onChangeUserName = event => {
        this.setState({username:event.target.value})
    }

    onDeeleteUserList = async id => {
      const url = `https://safetyconnect.herokuapp.com/users/${id}/`
      const options = {
        method:"DELETE"
      }
      const response = await fetch(url,options)
      if (response.ok === true){
        this.getUserList()
      }
      

    }

    renderSuccessView = () => {
        const {listOfUsers} = this.state 

        return(
            <ul className='user-ul-container'>
        {
            listOfUsers.map(eachUser => (
                <UserList onDeeleteUserList={this.onDeeleteUserList} key={eachUser.id} userListItems={eachUser}/>
            ))
        }
            </ul>
        )
    }

    renderLoadingView = () => (
        <div className='loading-container'>
            <Loader type="TailSpin" color="#0000ff" height={50} width={50} />
        </div>
    )

    renderFailureView = () => (
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
        onClick={this.getUserList}
      >
        Try Again
      </button>
      </div>
    )

    renderUserListData = () => {
        const {apiStatus} = this.state 

        switch(apiStatus) {
            case constantApiStatus.inProcess:
                return this.renderLoadingView()
            case constantApiStatus.inSuccess:
                return this.renderSuccessView()
            case constantApiStatus.inFailure:
                return this.renderFailureView()
            default :
               return null
        }
    }
    
    render(){
        const {isShowAddUser,username,isErrorShow,error} = this.state
        
        return(
            <div className="main-container">
            <Header/>
            <div className="sub-container">
            <div className='user-list-container'>
            <h1 className='list-heading'>User List</h1>
            <button className='btn-add' onClick={this.onClickUserColum}>Add User</button>
            </div>
            {isShowAddUser &&
            <form className='form-container' onSubmit={this.onSubmitUsername}>
                <BiArrowBack className='cancel-icon' onClick={this.onCloseAddUserColumn}/>
             <label className="label" htmlFor="username" >Username</label>
             <input placeholder='Enter Username' id="username" className="input" type="text" value={username} onChange={this.onChangeUserName}/>
             <button className='btn-click' type='submit'>Click</button>
             {isErrorShow && <p className="error-msg">*{error}</p>}
            </form>
            }
            {this.renderUserListData()}
            </div>
            </div>
        )
    }
}

export default Home