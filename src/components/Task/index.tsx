import TextBox from "../TextBox";
import { taskI } from "../../api/taskApi";
import taskApi from "../../api/taskApi";
import {ImBin2} from 'react-icons/im'
import {useRef} from 'react'
import './task.scss'

interface propsI {
    task: taskI,
    handleFetchApi: () => Promise<void>
}

function Task({task, handleFetchApi}: propsI) {
    const taskRef = useRef<HTMLDivElement>(null)

    function handleDeleteTask() {
        taskApi.delete(task.id).then(() => {
            handleFetchApi()
        })
    }

    return ( <div ref={taskRef} className="task">
        <div style={{flex: '1'}}>
            <TextBox taskRef={taskRef} handleFetchApi={handleFetchApi} task={task}/>
        </div>
        <ImBin2 onClick={handleDeleteTask} className="bin"/>
    </div> );
}

export default Task;