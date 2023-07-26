import React, { useContext, useState } from 'react'
import "../styles/auth-form.css"
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import AppContext from './AppContext'
import { axiosInstanceOptions, createAxiosInstance } from '../axios-instances/instance'

const Register = observer(()=>{
  const {user} = useContext(AppContext)
  const [userInput, setUserInput] = useState({name: "", email: "", password: ""})
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value })
  }

  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault()
      const options: axiosInstanceOptions = {
        baseURL: '/api/v1/auth/register'
      }
      const instance = createAxiosInstance(options)
      const response = await instance.post('/', userInput)
      // console.log(response)
      const {accessToken, refreshToken, userName, userId} = response.data.data;
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("userId", userId)
      user.setCurrentUser({_id:userId, name: userName, email: '', password: ''} as UserStore)
      navigate("/")
    }
    catch(error: any){
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <section className="auth-container">
        <form action="" className="auth-form" onSubmit={onSubmitHandle}>
            <h2>Register new account</h2>
            {errorMessage && (<div className="error-message">Error: {errorMessage}</div>)}
            <input type="name" name="name" id="registerName"  placeholder="Enter your name" onChange={onChangeHandle} value={userInput.name}/>
            <input type="email" name="email" id="registerEmail"  placeholder="Enter your email" onChange={onChangeHandle} value={userInput.email}/>
            <input type="password" name="password" id="registerPassword"  placeholder="Password" onChange={onChangeHandle} value={userInput.password}/>
            <button className="btn" type="submit">Register</button>
        </form>
    </section>
  )
})

export default Register