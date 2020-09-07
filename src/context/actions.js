import { actionTypes } from "./actionTypes"
import { PRIORITY } from "../constants"

export const addTodo = (priority = PRIORITY.HIGH, title) => {
    return {
        type: actionTypes.ADD_TODO,
        payload: {
            priority,
            title
        }
    }
}

export const updateCompleted = (_id, isCompleted) => {
    return {
        type: actionTypes.UPDATE_COMPLETED,
        payload: {
            _id,
            isCompleted
        }
    }
}

export const deleteTodo = (_id) => {
    return {
        type: actionTypes.DELETE_TODO,
        payload: {
            _id
        }
    }
}