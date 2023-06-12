const MY_FRIENDS = 'users/myFriends'
const OTHERS_FRIENDS = 'users/othersFriends'
const ADD_FRIEND = 'users/addFriend'
const UNFRIEND = 'users/unFriend'
const CUR_USER_FRIENDS = 'users/homies'
// TODO: make a route to get the current users friends and populate them in their own obj?

const CLEAN_UP = 'users/cleanup'

// loads current users friends only where the other one loads visited users
const loadCurrFriends = (homies) => ({
  type: CUR_USER_FRIENDS,
  payload: homies
})

const cleanUpFriends = () => ({
  type: CLEAN_UP
})

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

export const cleanUpFriendsThunk = () => async dispatch => {
  await dispatch(cleanUpFriends());
}

export const myHomiesThunk = () => async dispatch => {
  const res = await fetch("/api/users/friends")
  if (res.ok) {
    const friends = await res.json()
    await dispatch(loadCurrFriends(friends))
    return res
  } else return null
}

export const myFriendsThunk = () => async dispatch => {
  const res = await fetch("/api/users/friends")
  if (res.ok) {
    const friends = await res.json()
    await dispatch(myFriends(friends))
    return res
  } else return null
}


export const othersFriendsThunk = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/friends`)
  if (res.ok) {
    const friends = await res.json()
    await dispatch(othersFriends(friends))
    return res
  } else return null
}

export const addFriendThunk = (friendId) => async dispatch => {
  const res = await fetch(`/api/users/${friendId}/add`, {
    method: 'POST'
  })

  if (res.ok) {
    const friend = await res.json()
    await dispatch(addFriend(friend))
    await dispatch(othersFriendsThunk(friendId))
    return res
  } else return null
}

export const unFriendThunk = (friendId) => async dispatch => {
  const res = await fetch(`/api/users/${friendId}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const friend = await res.json()
    await dispatch(unFriend(friend))
    await dispatch(othersFriendsThunk(friendId))
    return res
  } else return null
}

const initialState = { friends: {}, homies: {} }

const friendsReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case CUR_USER_FRIENDS:
      const homiesState = { ...state, friends: { ...state.friends }, homies: {}}
      action.payload.forEach(homie => homiesState.homies[homie.id] = homie);
      return homiesState;
    case MY_FRIENDS: {
      newState = { ...state, friends: {} }
      action.payload.forEach(friend => newState.friends[friend.id] = friend)
      return newState
    }
    case OTHERS_FRIENDS: {
      newState = { ...state, friends: {} }
      action.payload.forEach(friend => newState.friends[friend.id] = friend)
      return newState
    }
    case ADD_FRIEND: {
      newState = { ...state, friends: { ...state.friends } }
      newState.friends[action.payload.id] = action.payload
      return newState
    }
    case UNFRIEND: {
      newState = { ...state, friends: { ...state.friends } }
      delete newState.friends[action.payload.id]
      return newState
    }
    case CLEAN_UP:
      return { friends: {} }
    default:
      return state;
  }
}

export default friendsReducer
