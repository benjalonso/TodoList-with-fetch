import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";

const Todo = () => {
  const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/";
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const toDoNameRef = useRef();
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
      setTodos([...todos, inputValue]);
      setTodo([...todos, inputValue]);
      const task = {
				label: toDoNameRef.current.value,
				done: false,
			};
      updateFetch(API_URL+user, [...todos, task]);
      setInputValue("");
      toDoNameRef.current.value = "";
      swal("You can do it!", "Task has been added", "success");
    } else if (inputValue === "" && e.keyCode === 13) {
      swal("Heeeey!", "Always you can do something new!");
    }
  };
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  useEffect(() => {
  	getTodos();
  }, [todo]);

  const getTodos = async () => {
  	const response = await fetch(API_URL+user, {
  		method: "GET",
  		headers: {
  			"Content-Type": "application/json",
  		},
  	});
  	const data = await response.json();
  	setTodos(data);
  };

  const createUser = (e) => {
    if (inputUserValue !== "" && e.keyCode === 13) {
      setUser(inputUserValue);
      const fullURL = API_URL + inputUserValue;
      console.log(fullURL);
      createUserFetch(fullURL);
      setInputUserValue("");
      swal("User created", "Lets do it!", "success");
    } else if (inputUserValue === "" && e.keyCode === 13) {
      swal("Heeeey!", "PUT YOU NAME!");
    }
  };
  const createUserFetch = (url) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFetch = (url, todo) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
        className="userInput"
          placeholder="Put your name"
          type="text"
          onChange={(e) => setInputUserValue(e.target.value)}
          onKeyUp={createUser}
          value={inputUserValue}
        
        ></input>
        <input
          className="todoInput"
          placeholder="What has to be done today?"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={validateInput}
          value={inputValue}
          ref={toDoNameRef}
        />

        <ul className="todoList">
          {todos.map((todo, index) => {
            return (
              <li onMouseOver={hideXButton} className="list" key={index}>
                {todo.label}
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
        <div className="itemsLeft">{todos.length} Todo's left</div>
      </div>
    </div>
  );
};

export default Todo;
