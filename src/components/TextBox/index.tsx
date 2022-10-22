import "./textbox.scss";
import React, { useState, useEffect, useRef } from "react";
import { taskI } from "../../api/taskApi";
import taskApi from "../../api/taskApi";

interface propsI {
  task?: taskI;
  type?: string;
  handleFetchApi: () => Promise<void>;
  taskRef?: React.RefObject<HTMLDivElement> | undefined | null
}

function TextBox({ task, type, handleFetchApi, taskRef }: propsI) {
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const checkRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) {
      setText(task.title);
    }
  }, [task]);

  function handleOnchangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleKeyDownEnter(event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent) {
    console.log(event);
    
    if (("key" in event && event.keyCode === 13) || event.type === "blur") {
      if (type === "add" && text!=="") {
        taskApi
          .post({
            title: text,
            status: check === true ? "completed" : "not_started",
          })
          .then(() => {
            setText("");
            if(checkRef.current)
              checkRef.current.checked = false
            setCheck(false);
            handleFetchApi();
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        if(text !== "" && task) {
          taskApi.put(task.id, {
            title: text,
            status: checkRef.current?.checked === true ? 'completed' : 'not_started'
          }).then(() => {
            inputRef.current?.blur()
            handleFetchApi()
          })
        } else if(text === "" && task) {
          taskApi.delete(task.id).then(() => {
            inputRef.current?.blur()
            handleFetchApi()
          })
        }
      }
    }
  }

  function handleUpdateTask() {
    if(type === "add")
      setCheck(!check);
    else {
      if(task) {
        taskApi.put(task.id, {
          id: task.id,
          title: text,
          status: task.status === 'completed' ? 'not_started' : 'completed'
        }).then(() => {
          setCheck(!check);
          handleFetchApi()
        })
      }
    }

  }

  function handleForcus() {
    if(inputRef.current && taskRef && taskRef.current) {
      inputRef.current.style.color = "black";
      taskRef.current.style.backgroundColor = "#ccc";
    }
  }
  function handleBlur(event: React.FocusEvent) {
    if(inputRef.current && taskRef && taskRef.current) {
      inputRef.current.style.color = "#0C75F1";
      taskRef.current.style.backgroundColor = "unset";
    }
    handleKeyDownEnter(event)
  }
  

  return (
    <div ref={taskRef} className="textbox">
      <label className="rad">
        <input
          onChange={handleUpdateTask}
          ref={checkRef}
          type="checkbox"
          defaultChecked={type==="add" ? check : task?.status === "completed" ? true : false}
          name="r1"
          value="a"
        />
        <i></i>
      </label>
      <input
        ref={inputRef}
        onFocus={() => {handleForcus()}}
        onBlur={(e) => {handleBlur(e)}}
        onKeyDown={(e) => {
          handleKeyDownEnter(e);
        }}
        className="enter_task"
        onChange={(e) => {
          handleOnchangeInput(e);
        }}
        value={text || ""}
        type="text"
        placeholder="Add a task"
      />
    </div>
  );
}

export default TextBox;
