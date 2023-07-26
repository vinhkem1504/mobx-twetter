import { createContext } from "react";
import UserStore from "../stores/UserStore";
import ListPostsStore from "../stores/ListPostsStore";

const initialState = {
    user: new UserStore("", ""),
    posts: new ListPostsStore([])
  }
const AppContext = createContext<{user: UserStore , posts: ListPostsStore}>(initialState)
export default AppContext