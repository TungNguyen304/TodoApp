import { combineReducers } from "redux"
import { taskReducer } from "./task"
const rootReducer = combineReducers({
    taskReducer: taskReducer
})

export default rootReducer