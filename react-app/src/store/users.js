const ALL_USERS = 'users/allUsers'
const SINGLE_USER = 'users/singleUser'

const allUsersAction = (users) => ({
    type: ALL_USERS,
    payload: users
})

const singleUserAction = (user) => ({
    type: SINGLE_USER,
    payload: user
})

export const allUsersThunk = () => async (dispatch) => {
    const res = await fetch("/api/users/")
    if (res.ok) {
        const users = await res.json()
        await dispatch(allUsersAction(users))
        return users
    } else {
        const errors = await res.json()
        return errors
    }
}

export const singleUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if (res.ok) {
        const user = await res.json()
        await dispatch(singleUserAction(user))
        return user
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = { allUsers: {}, singleUser: {} }

const usersReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_USERS: {
            newState = { ...state, allUsers: {} }
            for (let user of action.payload) {
                newState.allUsers[user.id] = user
            }
            return newState
        }
        case SINGLE_USER: {
            newState = { ...state, singleUser: {} }
            newState.singleUser = action.payload
            return newState
        }
        default:
            return state;
    }
}

export default usersReducer
