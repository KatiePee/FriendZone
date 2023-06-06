const ALL_POSTS = 'posts/allPosts'
const SINGLE_POST = 'posts/singlePosts'
const DELETE_POST = 'posts/deletePost'
const EDIT_POST = 'posts/editPost'

const ADD_COMMENT = 'comments/addComment'

const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
})


const allPostsAction = (posts) => ({
  type: ALL_POSTS,
  payload: posts
})

const singlePostAction = (post) => ({
  type: SINGLE_POST,
  payload: post
})

const deletePostAction = (postId) => ({
  type: DELETE_POST,
  payload: postId
})

const editPostAction = (post) => ({
  type: EDIT_POST,
  payload: post
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


export const allPostsThunk = () => async dispatch => {
  console.log("all post thunk called")
  const res = await fetch("/api/posts/", {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (res.ok) {
    const posts = await res.json()
    dispatch(allPostsAction(posts))
    return res
  } else return null
}

export const singlePostThunk = (postId) => async dispatch => {
  const res = await fetch(`/api/posts/${postId}`);
  if (res.ok) {
    const post = await res.json()
    dispatch(singlePostAction(post))
    return res
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const createPostThunk = (post) => async dispatch => {
  const res = await fetch(`/api/posts/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  if (res.ok) {
    const newPost = await res.json()
    dispatch(allPostsThunk())
    return newPost
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const deletePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const response = await res.json()
    dispatch(deletePostAction(postId))
    return response
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const currentUserPostsThunk = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/users/${userId}`);
    const posts = await res.json()
    await dispatch(allPostsAction(posts))
    return res
  } catch (e) {
    return e
  }
}

export const editPostThunk = (post, postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(post)
  });

  if(res.ok) {
    const updatedPost = await res.json();
    dispatch(editPostAction(updatedPost))
    //was thinking about dispatching in here too.
    return updatedPost;
  }
}

const initialState = { allPosts: {}, singlePost: {} }

const postReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case ALL_POSTS:
      newState = { ...state, allPosts: {}, singlePost: {} }
      action.payload.forEach(post => {
        newState.allPosts[post.id] = post
      })
      return newState
    case DELETE_POST:
      newState = { ...state, allPosts: { ...state.allPosts } }
      delete newState.allPosts[action.payload]
      return newState
    case EDIT_POST:
      //Check if this the correct state!
      let aState = { ...state }
      aState.allPosts[action.payload.id].content = action.payload.content;
      // TODO: work on ability to edit pictures
      // aState.allPosts[action.payload.id].postImages = [...action.payload.postImages];
      return aState
    default:
      return state;
  }
}

export default postReducer
