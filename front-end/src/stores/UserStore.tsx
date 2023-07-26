import { makeAutoObservable } from "mobx"

class UserStore{
    _id: string | undefined
    name: string | undefined
    email: string | undefined
    password: string | undefined

    constructor(_id: string, name: string){
        makeAutoObservable(this)
        this._id = _id
        this.name = name
        this.email = ""
        this.password = ""
    }

    setCurrentUser(currentUser: UserStore){
        this._id = currentUser._id
        this.name = currentUser.name
        this.email = currentUser.email
        this.password = currentUser.password
    }

    get currentUser(){
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}

export default UserStore