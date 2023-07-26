import React, { useContext, useState } from 'react'
import '../styles/form.css'
import { observer } from 'mobx-react'
import UserStore from '../stores/UserStore'
import AppContext from './AppContext'

const Form = observer(({addPost}: {addPost: (user: UserStore, textContent: string)=>void})=>{
  const {user} = useContext(AppContext)
  const [contentText, setContentText] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onChangeHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value)
    //console.log(e.target.value)
  }

  return (
    <section className="form-section">
        <form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
          try {
            addPost(user, contentText)
            setContentText("")
          } catch (error: any) {
            setErrorMessage("Failed")
          }
        }}>
          {
            errorMessage && (<div className='error-message'>{errorMessage}</div>)
          }
            <textarea
                name="content"
                id="content"
                className="content"
                placeholder="What's happening?"
                value={contentText}
                onChange={onChangeHandle}
            ></textarea>
            <button className="btn" type="submit">Tweet</button>
        </form>
    </section>
  )
})

export default Form
