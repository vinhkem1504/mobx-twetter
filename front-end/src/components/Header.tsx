import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import "../styles/header.css"
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import AppContext from './AppContext'



const Header = observer(()=>{
  const {user} = useContext(AppContext)
  const isUser = user?._id ? user?._id : null

  function signOut(): void {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userId")
    user?.setCurrentUser(new UserStore("", ""))
  }

  return (
    <div className="header">
        <h1 className="logo">
          <Link to='/'>Twitter</Link>
        </h1>
        <nav>
            <ul className="main-nav">
                {
                  isUser ? (
                    <><li><span className="user-name">Hello, {user?.name}</span></li><li><Link to="/login" onClick={()=>signOut()}>Sign out</Link></li></>
                  ) : 
                  <><li><Link to="/login">Login</Link></li><li><Link to="/register">Register</Link></li></>
                }
            </ul>
        </nav>
    </div>
  )
})

export default Header
