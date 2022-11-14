import {Link} from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";
import './index.css' 

const UserList = props => {
    const {userListItems,onDeeleteUserList} = props 
    const {id,username} = userListItems 
    const randomColor = [
        "color1" ,"color2","color3" ,"color4","color5" ,"color6",
    ]
    const result = randomColor[Math.floor(Math.random() * randomColor.length)]
    
    const deleteUser = () => {
        onDeeleteUserList(id)
    } 

    return(
        <li className='li-container'>
          <div className="avathar-letter-container">
           <div className={`${result} avathar`}>
            <p className="first-letter">{username[0].toUpperCase()}</p>
           </div>
           <Link to={`/task/user/${id}/`}>
           <p className="username-para">{username}</p>
           </Link>
          </div>
          <button type="button" onClick={deleteUser} className="btn-delete-user">
          <MdDeleteOutline className="delete-icon"/>
          </button>
        </li>
    )
}

export default UserList