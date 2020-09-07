import React, { useRef, useState } from 'react';
import './App.css';
import Todo from './todo/Todo';
import { PRIORITY_KEYS } from './constants';
import { useStateValue } from './context/StateProvider';
import CloseIcon from '@material-ui/icons/Close';
import { addTodo } from './context/actions';

function App() {
	const todosEle = useRef(),
		[input, setInput] = useState(''),
		[todos, dispatch] = useStateValue(),
		updateTodoPopup = useRef();

	// const collapseTodos = _ => {
	// 	const todos = todosEle.current.querySelectorAll('.todo');
	// 	if (todosEle.current.hasAttribute('collapsed')) {
	// 		[...todos].forEach(todo => {
	// 			todo.style.transform = `none`;
	// 		})
	// 		todosEle.current.removeAttribute('collapsed');
	// 	} else {
	// 		[...todos].forEach((todo, index) => {
	// 			todo.style.transform = `translateY(-${todo.offsetTop - (index * 10)}px)`;
	// 		})
	// 		todosEle.current.setAttribute('collapsed', '');
	// 	}
	// }

	const onTodoAdded = (e) => {
		e.preventDefault();
		if (input) {
			const selectedPriority = e.currentTarget.querySelector('[type="radio"]:checked')?.value;
			dispatch(addTodo(selectedPriority, input));
			setInput('');
		}
	}

	const onEditClicked = (_id) => {
		updateTodoPopup.current.classList.remove('update-todo--hidden');
	}

	return (
		<div className="app">
			<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
			{/* <button onClick={collapseTodos}>Collapse</button> */}
			<div ref={todosEle} className="todos">
				{
					todos &&
					todos?.map((todo, index) => (
						<Todo key={index} _id={todo._id} priority={todo.priority} title={todo.title} isCompleted={todo.isCompleted} onEditClicked={onEditClicked} />
					))
				}
				<form onSubmit={onTodoAdded}>
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
			</div>
			<div ref={updateTodoPopup} className="update-todo update-todo--hidden">
				<div className="update-todo__content">
					<form>
						<CloseIcon onClick={_ => updateTodoPopup.current.classList.add('update-todo--hidden')} />
						<input className="todos__input" type="text" placeholder="Update Todo" />
						<div role="radiogroup" className="priority">
							{
								PRIORITY_KEYS.map((priority, index) => (
									<div key={index} className="priority__wrapper">
										<input type="radio" name="rb" id={`update-${priority}`} value={priority} />
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
