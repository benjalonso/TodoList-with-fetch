import React, { useState, useEffect } from "react";
import swal from "sweetalert";
// import fetchTodo from "/workspace/react-hello/src/js/component/fetchTodo.jsx"

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([{label: ""}]);
  const [deleteButton, setDeleteButton] = useState("hideDelete");

  const hideXButton = () => {
    setTimeout(() => {
      setDeleteButton("showDelete");
    }, 0);
    return setTimeout(() => {
      setDeleteButton("hideDelete");
    }, 1000);
  };
  const validateInput = (e) => {
    if (inputValue !== "" && e.keyCode === 13) {
      setTodo([...todo, inputValue]);
      setInputValue("");
      swal("You can do it!", "Task has been added", "success");
    } else if (inputValue === "" && e.keyCode === 13) {
      swal("Heeeey!", "Always you can do something new!");
    }
  };
  const deleteTodo = (index) => {

    todo.splice(index, 1);
    setTodo([...todo]);
  };
  useEffect(() => {
   const json = getFetch("https://assets.breatheco.de/apis/fake/todos/user/benja");
   console.log(json)
  }, []);

  const getFetch = (url) => {
    fetch(url)
      .then((response) => {
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        // setTodo(data);
        // console.log(todo);
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };

  return (
    <div>
      <div className=" titlePaper container  bg-warning">
        <h1 className="title">Todo's List</h1>
      </div>
      <div className="container cajaTodo">
        <input
          className="todoInput"
          placeholder="What has to be done today?"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={validateInput}
          value={inputValue}
        />

        <ul className="todoList">
          {todo.map((value, index) => {
            return (
              <li onMouseOver={hideXButton} className="list" key={index}>
                {value.label}
                <button
                  onClick={() => {
                    deleteTodo(index);
                  }}
                  className={deleteButton}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
