import React, { useContext, useState } from 'react'
import "../styles/auth-form.css"
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import AppContext from './AppContext'
import { axiosInstanceOptions, createAxiosInstance } from '../axios-instances/instance'

const Login = observer(()=>{
  const {user} = useContext(AppContext)

  const [userInput, setUserInput] = useState({email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value })
  }

  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault()
      const options: axiosInstanceOptions = {
        baseURL: '/api/v1/auth/login'
      }
      const instance = createAxiosInstance(options)
      const response = await instance.post('/', userInput)
      // console.log("************",response)
      const {accessToken, refreshToken, userName, userId} = response.data.data;
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("userId", userId)
      // console.log("user-login", {_id:userId, name: userName, email: '', password: ''})
      // console.log(user.currentUser)
      user.setCurrentUser(new UserStore(userId, userName))
      
      
      navigate("/")
    }
    catch(error: any){
      //console.log(error.response.data.message)
      setErrorMessage(error.response.data.message)
     // console.log(error)
    }
  }

  return (
    <section className="auth-container">
        <form action="" className="auth-form" onSubmit={onSubmitHandle}>
            <h2>Enter your account</h2>
            { 
              errorMessage && (<div className="error-message">Error: {errorMessage}</div>)
            }
            <input type="email" name="email" id="email" required placeholder="Enter your email" onChange={onChangeHandle} value={userInput.email}/>
            <input type="password" name="password" id="password" required placeholder="Password" onChange={onChangeHandle} value={userInput.password}/>
            <button className="btn" type="submit">Login</button>
        </form>
    </section>
  )
})

export default Login