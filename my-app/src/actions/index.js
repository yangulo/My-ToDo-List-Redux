// Constants

// Add Item
export const ADD_ITEM = "ADD_ITEM"

// Delete Item
export const DELETE_ITEM = "DELETE_ITEM"

// Update Item
export const UPDATE_ITEM = "UPDATE_ITEM"

// Done Item
export const DONE_ITEM = "DONE_ITEM"

// Delete Done Item
export  const DELETE_DONE_ITEM = "DELETE_DONE_ITEM"

// Hide Item
export const HIDE_ITEM = "HIDE_ITEM"

// Action Creators
function addItem(text) {
    return {
        type: ADD_ITEM,
        text: text
    }
}

function updateItem(item_to_update, item_index){
    return{
        type: UPDATE_ITEM,
        text: item_to_update,
        index: item_index
    }
}

function deleteItem(item_index){
    return{
        type: DELETE_ITEM,
        index: item_index
    }
}

function doneItem(text){
    return{
        type: DONE_ITEM,
        text: text
    }
}

function deleteDoneItem(item_index){
    return {
        type: DELETE_DONE_ITEM,
        index: item_index
    }
}

function hideItem(item_index){
    return {
        type: HIDE_ITEM,
        index: item_index
    }
}

// Bound Action Creators
export const boundAddItem = (text) => (dispatch) => dispatch(addItem(text))
export const boundUpdateItem = (item_to_update, item_index) => (dispatch) => dispatch(updateItem(item_to_update, item_index))
export const boundDeleteItem = (item_index) => (dispatch) => dispatch(deleteItem(item_index))
export const boundDeleteDoneItem = (item_index) => (dispatch) => dispatch(deleteDoneItem(item_index))
export const boundDoneItem = (text) => (dispatch) => dispatch(doneItem(text))
export const boundHideItem = (item_index) => (dispatch) => dispatch(hideItem(item_index))