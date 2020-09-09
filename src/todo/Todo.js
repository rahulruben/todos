import React, { useRef } from 'react'
import './Todo.css';
import { useStateValue } from '../context/StateProvider';
import { updateCompleted, deleteTodo } from '../context/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

function Todo({ todo, onEditClicked }) {
    const checkBox = useRef(),
        [todos, dispatch] = useStateValue();

    // useEffect(() => {
    //     const removeAnimation = _ => {
    //         todo.current.classList.remove('animate');
    //         // todo.current.removeListener("animationend", removeAnimation);
    //     }
    //     todo.current.addEventListener("animationend", removeAnimation);
    // }, [])


    return (
        <div className={`todo todo--${todo.isCompleted ? 'completed' : todo.priority} animate`}>
            <div className="todo__content">
                <input ref={checkBox} onClick={e => dispatch(updateCompleted(todo._id, e.target.checked))} type="checkbox" name={'cb'} id={todo._id} />
                <label htmlFor={todo._id}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84">
                        <g>
                            <g>
                                <rect className="cls-1" x="2.5" y="2.5" width="79" height="79" rx="4.01" />
                                <path className="box" d="M86.49,14A1.52,1.52,0,0,1,88,15.51v71A1.52,1.52,0,0,1,86.49,88h-71A1.52,1.52,0,0,1,14,86.49v-71A1.52,1.52,0,0,1,15.51,14h71m0-5h-71A6.5,6.5,0,0,0,9,15.51v71A6.5,6.5,0,0,0,15.51,93h71A6.5,6.5,0,0,0,93,86.49v-71A6.5,6.5,0,0,0,86.49,9Z" transform="translate(-9 -9)" />
                            </g>
                            <polyline className="check cls-2" points="17.5 45.5 28.5 60.5 65.5 29.5" />
                        </g>
                    </svg>
                    <span className="todo__title">{todo.title}</span>
                </label>
                <IconButton onClick={_ => onEditClicked(todo)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={_ => dispatch(deleteTodo(todo._id))}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Todo;
