import React, { useRef, useState } from 'react';
import './App.css';
import Todo from './todo/Todo';
import { PRIORITY_KEYS } from './constants';
import { useStateValue } from './context/StateProvider';
import CloseIcon from '@material-ui/icons/Close';
import { addTodo, updateTodo } from './context/actions';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

function App() {
	const todosEle = useRef(),
		[input, setInput] = useState(''),
		[todos, dispatch] = useStateValue(),
		updateTodoPopup = useRef(),
		[open, setOpen] = useState(false),
		[collapsed, setCollpased] = useState(false),
		[updateInput, setUpdateInput] = useState(''),
		[updateId, setUpdateId] = useState(''),
		[updatePriority, setUpdatePriority] = useState('');


	const collapseTodos = _ => {
		const todos = todosEle.current.querySelectorAll('.todo');
		if (collapsed) {
			[...todos].forEach(todo => {
				todo.style.transform = `none`;
			})
			setCollpased(false);
		} else {
			[...todos].forEach((todo, index) => {
				todo.style.transform = `translateY(-${todo.offsetTop - (index * 10)}px)`;
			})
			setCollpased(true);
		}
	}

	const onTodoAdded = async (e) => {
		e.preventDefault();
		if (input) {
			const selectedPriority = e.currentTarget.querySelector('[type="radio"]:checked')?.value;
			await dispatch(addTodo(selectedPriority, input));
			todosEle.current.lastElementChild.scrollIntoView();
			setInput('');
		}
	}

	const onEditClicked = (_todo) => {
		setOpen(true);
		setUpdateInput(_todo.title);
		setUpdateId(_todo._id);
		setUpdatePriority(_todo.priority)

	}
	const onUpdateSubmit = (e) => {
		e.preventDefault();
		dispatch(updateTodo(updateId, updateInput, updatePriority));
		setOpen(false);
	}

	return (
		<div className="app">
			<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>

			{/* <IconButton onClick={collapseTodos} className={`expand-collapse-btn ${collapsed ? 'collapse--hide' : ''}`}>
				<MenuIcon aria-label="collapse" />
			</IconButton>
			<IconButton onClick={collapseTodos} className={`expand-collapse-btn ${!collapsed ? 'collapse--hide' : ''}`}>
				<CloseIcon aria-label="expanded"/>
			</IconButton> */}

			<header className="todos__header">
				<img className="todos__logo" src="todo-icon.svg" alt="" />
				<h1>todos app</h1>
			</header>
			<div ref={todosEle} className={`todos ${collapsed ? 'collapsed' : ''}`}>
				{
					todos &&
					todos?.map((todo, index) => (
						<Todo key={index} todo={todo} onEditClicked={onEditClicked} />
					))
				}
			</div>
			<form className="todos__form" onSubmit={onTodoAdded}>
				<input onChange={e => setInput(e.target.value)} className="todos__input" type="text" placeholder="Enter Todo" value={input} />
				<button style={{ display: 'none' }} type="submit" />
				<div role="radiogroup" className="priority">
					{
						PRIORITY_KEYS.map((priority, index) => (
							<div key={index} className="priority__wrapper">
								<input type="radio" name="rb" id={priority} value={priority} />
								<label htmlFor={priority}>
									<span className="priority__title">{priority}</span>
								</label>
							</div>
						))
					}
				</div>
			</form>
			<div ref={updateTodoPopup} className={`update-todo ${open ? "update-todo--show" : ""}`}>
				<div className="update-todo__content">
					<form onSubmit={onUpdateSubmit}>
						<CloseIcon onClick={_ => setOpen(false)} />
						<input onChange={e => setUpdateInput(e.target.value)} className="todos__input" type="text" placeholder="Update Todo" value={updateInput} />
						<button style={{ display: 'none' }} type="submit" />
						<div role="radiogroup" className="priority">
							{
								PRIORITY_KEYS.map((priority, index) => (
									<div key={index} className="priority__wrapper">
										<input onChange={e => setUpdatePriority(e.target.value)} type="radio" name="rb" id={`update-${priority}`} value={priority} checked={updatePriority === priority} />
										<label htmlFor={`update-${priority}`}>
											<span className="priority__title">{priority}</span>
										</label>
									</div>
								))
							}
						</div>
					</form>
				</div>
			</div>
		</div >
	);
}

export default App;
