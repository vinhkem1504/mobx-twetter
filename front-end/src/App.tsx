import React, { useCallback, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import AppContext from './components/AppContext';
import UserStore from './stores/UserStore';
import ListPostsStore from './stores/ListPostsStore';
import { axiosInstanceOptions, createAxiosInstance } from './axios-instances/instance';

function App() {

  const {user, posts}: {user: UserStore, posts: ListPostsStore} = {...useContext(AppContext)}

  const checkCurrentUser = useCallback(async ()=>{
    try {
      const userId = localStorage.getItem("userId")

      const options: axiosInstanceOptions = {
        baseURL: '/api/v1/auth'
      }
      const instance = createAxiosInstance(options)
      const response = await instance.get('/')

      if(response.data.data.user && userId){
        const userName = response.data.data.user.userName
        user.setCurrentUser(new UserStore(userId, userName))
        console.log("crurrent", user.currentUser)
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])

  useEffect(()=>{
    checkCurrentUser()
  }, [checkCurrentUser])
  // console.log("App-user", user)
  return (
    <Router>
      <AppContext.Provider value={{user, posts}} >
        <div className="container">
          <Header/>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/' element={<Main/>} />
            <Route path='*' element={<div>Page not found</div>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
