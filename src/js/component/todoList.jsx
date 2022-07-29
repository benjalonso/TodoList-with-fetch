import React, { useState, useEffect } from "react";
import swal from "sweetalert";
// import fetchTodo from "/workspace/react-hello/src/js/component/fetchTodo.jsx"

const Todo = () => {
	const [inputValue, setInputValue] = useState("");
	const [todo, setTodo] = useState([]);
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
		setTodo([...task]);
	};
	useEffect(() => {
		getFetch('https://assets.breatheco.de/apis/fake/todos/user/benja');
	  }, []);
	
	const getFetch = async (url) => {
		 await fetch(url)
		  .then( response => {
			  console.log(response.ok); // Será true (verdad) si la respuesta es exitosa.
			  console.log(response.status); // el código de estado = 200 o código = 400 etc.
			  console.log(response.text()); // Intentará devolver el resultado exacto como cadena (string)
			  return  response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		  })
		  .then( (data) => {
			  console.log(JSON.stringify(data)); //esto imprimirá en la consola el objeto exacto recibido del servidor
			  setTodo(data.label)
			  console.log(todo)
		  })
		  .catch(error => {
			  //manejo de errores
			  console.log(error);
		  });
	}

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
							<li
								onMouseOver={hideXButton}
								className="list"
								key={index}>
								{value}
								<button
									onClick={() => {
										deleteTodo(index);
									}}
									className={deleteButton}>
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
