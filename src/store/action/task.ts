import { taskI } from "../../api/taskApi"
import taskApi from "../../api/taskApi"

export const setTaskCompleted = (task: taskI[]) => {
    return {
        type: 'SET_TASK_COMPLETED',
        payload: task
    }
}

export const setTaskNotCompleted = (task: taskI[]) => {
    return {
        type: 'SET_TASK_NOT_COMPLETED',
        payload: task
    }
}

export const setTaskAsync = () => {
    return async (dispatch: any) => {
        const res = await taskApi.get()
        dispatch(setTaskCompleted(res.data))
    }
}