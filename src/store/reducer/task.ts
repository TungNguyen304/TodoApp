import { taskI } from "../../api/taskApi"

const initState = {
    taskListCompleted: [],
    taskListNotCompleted: []
}

interface action {
    type: string,
    payload: [taskI]
}

export const taskReducer = (state = initState, action: action) => {
    switch (action.type) {
        case 'SET_TASK_COMPLETED' : {
            return {
                ...state,
                taskListCompleted: [...action.payload]
            }
        }
        case 'SET_TASK_NOT_COMPLETED': {
            return {
                ...state,
                taskListNotCompleted: [...action.payload]
            }
        }
        default: return state
    }
}