import ListTask from "./components/ListTask";
import TextBox from "./components/TextBox";
import { useDispatch, useSelector } from "react-redux";
import { taskI } from "./api/taskApi";
import { setTaskCompleted, setTaskNotCompleted } from "./store/action/task";
import taskApi from "./api/taskApi";
import { useEffect, useCallback } from "react";
import "./app.css";

export interface stateI {
  taskReducer: {
    taskListCompleted: taskI[];
    taskListNotCompleted: taskI[];
  };
}

function App() {
  const dispatch = useDispatch();
  const taskListCompleted = useSelector(
    (state: stateI) => state.taskReducer.taskListCompleted
  );
  const taskListNotCompleted = useSelector(
    (state: stateI) => state.taskReducer.taskListNotCompleted
  );

  const callback = useCallback(async() => {
    const res = await taskApi.get();
    const arrCompleted: taskI[] = [];
    const arrNotCompleted: taskI[] = [];
    res.data.forEach((item: taskI) => {
      if (item.status === "completed") {
        arrCompleted.push(item);
      } else {
        arrNotCompleted.push(item);
      }
    });
    dispatch(setTaskCompleted(arrCompleted));
    dispatch(setTaskNotCompleted(arrNotCompleted));
  }, [dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <div className="app">
      <div className="title">TO DO APP</div>
      <div className="add_input">
        <TextBox handleFetchApi={callback} type="add" />
      </div>
      <div>
        <ListTask
          handleFetchApi={callback}
          taskListNotCompleted={taskListNotCompleted}
        />
      </div>
      <div>
        <div style={{ fontWeight: "bold", margin: "20px 0" }}>Completed</div>
        <div>
          <ListTask
            handleFetchApi={callback}
            taskListCompleted={taskListCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
