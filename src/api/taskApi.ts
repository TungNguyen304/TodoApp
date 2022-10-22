import axiosInstance from "./axiosApi";
export interface taskI {
    [index:string]: number|string,
    title: string,
    status: string
}
const taskApi = {
    get: () => {
        const url = 'tasks'
        return axiosInstance.get(url)
    },
    post: (data: taskI) => {
        const url = 'tasks'
        return axiosInstance.post(url, {...data})
    },
    delete: (id: number|string) => {
        const url = `tasks/${id}`
        return axiosInstance.delete(url)
    },
    put: (id: number|string, data: taskI) => {
        const url = `tasks/${id}`
        return axiosInstance.put(url, data)
    }
}

export default taskApi