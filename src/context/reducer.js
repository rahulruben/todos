import { actionTypes } from "./actionTypes";

export const initialState = []

const ensureId = _ => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return [
                ...state,
                {
                    _id: ensureId(),
                    priority: action.payload.priority,
                    title: action.payload.title,
                    isCompleted: false
                }
            ]
        case actionTypes.UPDATE_COMPLETED:
            return state.map(todo => {
                if (todo._id === action.payload._id)
                    todo.isCompleted = action.payload.isCompleted;
                return todo;
            })
        case actionTypes.UPDATE_TODO:
            return state.map(todo => {
                if (todo._id === action.payload._id) {
                    todo.title = action.payload.title;
                    todo.priority = action.payload.priority;
                }
                return todo;
            })
        case actionTypes.DELETE_TODO:
            return state.filter(todo => !(todo._id === action.payload._id))
        default:
            return state;
    }
}
