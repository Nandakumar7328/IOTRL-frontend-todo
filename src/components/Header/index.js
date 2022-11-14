import {Link,withRouter} from 'react-router-dom'
import { FcTodoList } from "react-icons/fc"
import './index.css' 

const Header = () =>(
    <nav className='nav-container'>
    <Link to="/">
    <FcTodoList className="icon-logo"/>
    </Link>
    <h1 className="app-name">TodoList</h1>
    </nav>
)

export default withRouter(Header) 