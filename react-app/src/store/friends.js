const MY_FRIENDS = 'users/myFriends'
const OTHERS_FRIENDS = 'users/othersFriends'
const ADD_FRIEND = 'users/addFriend'
const UNFRIEND = 'users/unFriend'

const myFriends = (friends) => ({
  type: MY_FRIENDS,
  payload: friends
})

const othersFriends = (friends) => ({
  type: OTHERS_FRIENDS,
  payload: friends
})

const addFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend
})

const unFriend = (friend) => ({
  type: UNFRIEND,
  payload: friend
})

export const myFriendsThunk = () => async dispatch => {
  const res = await fetch("/api/users/friends")
  if (res.ok) {
    const friends = await res.json()
    await dispatch(myFriends(friends))
    return res
  } else return null
}


export const othersFriendsThunk = (userId) => async dispatch => {
  const res = await fetch(`/api//users/${userId}/friends`)
  if (res.ok) {
    const friends = await res.json()
    await dispatch(othersFriends(friends))
    return res
  } else return null
}

export const addFriendThunk = (friendId) => async dispatch => {
  console.log('😈😈~~~~~~~~~~~add friends thunk~~~~~friendid~~~~~~~~', friendId)
  const res = await fetch(`/api/users/${friendId}/add`, {
    method: 'POST'
  })

  if (res.ok) {
    const friend = await res.json()
    console.log('😈😈~~~~~~~~~~~~ add friendd thun res.json', friend)
    await dispatch(addFriend(friend))
    await dispatch(othersFriendsThunk(friendId))
    return res
  } else return null
}

export const unFriendThunk = (friendId) => async dispatch => {
  console.log('😈~~~~~~~~~~~~~~~unfriend thunk friend id', friendId)
  const res = await fetch(`/api/users/${friendId}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const friend = await res.json()
    console.log('😈~~~~~~~~~~~~ un friendd thunk res.json', friend)
    await dispatch(unFriend(friend))
    await dispatch(othersFriendsThunk(friendId))
    return res
  } else return null
}

const initialState = { friends: {} }

const friendsReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case MY_FRIENDS: {
      console.log('~~~~~~~~~~~~~~~hits my friends reducer')
      newState = { ...state, friends: {} }
      action.payload.forEach(friend => newState.friends[friend.id] = friend)
      return newState
    }
    case OTHERS_FRIENDS: {
      console.log('~~~~~~~~~~~~~~~hits my friends reducer')
      newState = { ...state, friends: {} }
      action.payload.forEach(friend => newState.friends[friend.id] = friend)
      return newState
    }
    case ADD_FRIEND: {
      newState = { ...state, friends: { ...state.friends } }
      newState.friends[action.payload.id] = action.payload
      console.log('👹~~~~~~~~~~~~~~~newState in the add friend reducer', newState)

      return newState
    }
    case UNFRIEND: {
      newState = { ...state, friends: { ...state.friends } }
      console.log('👹~~~~~~~~~~~~~~~newState in the unfriend reducer-- before delete', newState)

      delete newState.friends[action.payload.id]
      console.log('👹👹~~~~~~~~~~~~~~~newState in the unfriend reducer-- after delete', newState)
      return newState
    }
    default:
      return state;
  }
}

export default friendsReducer
