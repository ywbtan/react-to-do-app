import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Todo(props) {
	return (
		<div 
			className="todo"
			style={{ textDecoration: props.task.hasCompleted ? "line-through" : "" }}>
				{props.task.text}
			<div>
				<button onClick={props.onClick}>Complete</button>
			</div>
		</div>
	);
}

function TodoForm(props) {
	const [value, setValue] = useState("");
	
	const handleSubmit = e => {
		e.preventDefault();
		if (!value) return;
		props.addTask(value);
		setValue(""); // sets back the input to the empty field
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<input type="submit" value="Submit" />
		</form>
	);
}

function TodoContainer() {
	const [todos, setTodos] = useState([]);

	const addTask = newTask => {
		const newTodos = [...todos, {
			text: newTask,
			hasCompleted: false,
		}];
		setTodos(newTodos);
	};

	const completeTask = task => {
		task.hasCompleted = true;
		const newTodos = [...todos];
		setTodos(newTodos);
	};

	return (
		<div className="app">
			<div className="todo-list">
				{todos.map((todo, index) => {
					return (
						<Todo 
							task={todo}
							onClick={() => completeTask(todo)}
						/>
					);
				})}
				<TodoForm addTask={(task) => addTask(task)} />
			</div>
		</div>
	);
}

ReactDOM.render(
  <TodoContainer />,
  document.getElementById('root')
);
