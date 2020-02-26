import {ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, DONE_ITEM, DELETE_DONE_ITEM, HIDE_ITEM} from '../actions'
import {combineReducers} from 'redux'

// Initial state
const initialState= {
    items:[],
    itemsDone:[]
}

// Reducers
export function todos(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state, // Copia el estado como esta
                items: [...state.items, action.text]
            }   
        case UPDATE_ITEM:
            return {
                ...state,
                items: [...state.items.map((item, index) => index === action.index
                ? action.text
                : item
                )]
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: [...state.items.filter((item, index) => index !== action.index)]
            }
        case DONE_ITEM:
            return {
                ...state, 
                itemsDone: [...state.itemsDone, action.text]
            }
        case DELETE_DONE_ITEM:
            return {
                ...state,
                itemsDone: [...state.itemsDone.filter((item, index) => index !== action.index)]
            }
        case HIDE_ITEM:
            return {
                ...state,
                items: [...state.items.filter((item, index) => index !== action.index)]
            }
        default:
            return state
    } 
}

export default combineReducers({
    todos
})