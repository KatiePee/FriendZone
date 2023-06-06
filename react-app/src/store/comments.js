//JUST CREATED COMMENTS STORE... NOT FINALIZED

const ADD_COMMENT = 'comments/addComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'

//SOME ACTIONS MAY NEED TO PASS IN POST TO CORRELATE??
const addCommentAction = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
})


const editCommentAction = (commentId) => ({
    type: EDIT_COMMENT,
    payload: commentId
})


const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})


export const addCommentThunk = () => async (dispatch) => {
    const res = await fetch("/api/comments/", {
        headers: {"Content-Type": "application/json"},
    })

    if (res.ok) {
        const comment = await res.json()
        dispatch(addCommentAction(comment))
        return res
    }
}


export const editCommentThunk = (comment, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    });

    if(res.ok) {
        const updatedComment = await res.json();
        dispatch(editCommentAction(updatedComment))
        return updatedComment
    }
}


export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const response = await res.json()
        dispatch(deleteCommentAction(commentId))
        return response
    } else {
        const errors = await res.json();
        return errors;
    }
}

// State needs to be created/formatted
const initialState = {}
const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ADD_COMMENT:
            return null
        case EDIT_COMMENT:
            return null
        case DELETE_COMMENT:
            return null
        default:
            return state;
    }
}

export default commentReducer
