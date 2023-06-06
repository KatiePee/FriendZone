const ALL_POSTS = 'posts/allPosts'
const SINGLE_POST = 'posts/singlePosts'
const DELETE_POST = 'posts/deletePost'
const EDIT_POST = 'posts/editPost'

const ADD_COMMENT = 'comments/addComment'
const DELETE_COMMENT = 'comments/deleteComment'

const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
})

const deleteCommentAction = (postId, commentId) => ({
  type: DELETE_COMMENT,
  payload: {
    postId,
    commentId
  }
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

export const addCommentThunk = (content) => async (dispatch) => {
  const res = await fetch("/api/comments/new", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(content)
  })

  if (res.ok) {
      const comment = await res.json()
      dispatch(addCommentAction(comment))
      return res
  } else {
    console.log(res.errors)
  }
}

export const deleteCommentThunk = (comment) => async (dispatch) => {
  const { postId, id } = comment
  const res = await fetch(`/api/comments/${id}/delete`, {
      method: "DELETE"
  })

  if(res.ok) {
    const response = await res.json()
    dispatch(deleteCommentAction(postId, id))
      return response
  } else {
      const errors = await res.json();
      return errors;
  }
}


export const allPostsThunk = () => async dispatch => {
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
    case ADD_COMMENT:
      let newCommentsInState = { ...state }
      newCommentsInState.allPosts[action.payload.postId].comments.push(action.payload)

      return newCommentsInState;

    case DELETE_COMMENT:
      const { postId, commentId } = action.payload
      let newCommentsState = { ...state }
      // delete newCommentsState.allPosts[postId].comments[commentId - 1]
      let postComments = newCommentsState.allPosts[postId].comments
      let newCommentsList = postComments.filter(comment => comment.id !== commentId)

      newCommentsState.allPosts[postId].comments = newCommentsList

      return { ...state, allPosts: newCommentsState.allPosts }
    default:
      return state;
  }
}

export default postReducer
