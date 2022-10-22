import Task from "../Task";
import { taskI } from "../../api/taskApi";

interface propsI {
  taskListCompleted?: taskI[];
  taskListNotCompleted?: taskI[];
  handleFetchApi: () => Promise<void>;
}

function ListTask({ taskListCompleted, taskListNotCompleted, handleFetchApi }: propsI) {
  return (
    <div style={{ borderRadius: "5px", overflow: "hidden" }}>
      {taskListNotCompleted
        ? taskListNotCompleted?.map((item) => {
            return <Task handleFetchApi={handleFetchApi} key={item.id} task={item} />;
          })
        : taskListCompleted?.map((item) => {
            return <Task handleFetchApi={handleFetchApi} key={item.id} task={item} />;
          })}
    </div>
  );
}

export default ListTask;
