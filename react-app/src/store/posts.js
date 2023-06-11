const ALL_POSTS = 'posts/allPosts'
const SINGLE_POST = 'posts/singlePosts'
const DELETE_POST = 'posts/deletePost'
const EDIT_POST = 'posts/editPost'
const USER_POSTS = 'posts/userPosts'

const ADD_COMMENT = 'comments/addComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'

const CREATE_LIKE = "likes/likePost";
const REMOVE_LIKE = "likes/removeLike";

const CLEAN_UP = '/cleanup';

const cleanUpAction = () => ({
  type: CLEAN_UP
})

const createLikeAction = (postId, user) => ({
  type: CREATE_LIKE,
  payload: {
    postId,
    user
  }
});

const removeLikeAction = (postId, user) => ({
  type: REMOVE_LIKE,
  payload: {
    postId,
    user
  }
});

const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
})

const editCommentAction = (updatedComment ,postId, commentId) => ({
  type: EDIT_COMMENT,
  payload: {
    updatedComment,
    postId,
    commentId
  }
})

const deleteCommentAction = (postId, commentId) => ({
  type: DELETE_COMMENT,
  payload: {
    postId,
    commentId
  }
})

const userPostsAction = (posts) => ({
  type: USER_POSTS,
  payload: posts
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


export const cleanUpStoreThunk = () => async (dispatch) => {
  dispatch(cleanUpAction())
}


export const createLikeThunk = (postId, user) => async (dispatch) => {
  const res = await fetch(`/api/likes/posts/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postId),
  });
  if (res.ok) {
    dispatch(createLikeAction(postId, user));
    return res;
  } else {
    const errors = res.json();
    return errors;
  }
};

export const removeLikeThunk = (postId, user) => async (dispatch) => {
  const res = await fetch(`/api/likes/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeLikeAction(postId, user));
  } else {
    const errors = res.json();
    return errors;
  }
};

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
    const errors = await res.json();
    return errors;
}
}

export const editCommentThunk = (content, comment) => async (dispatch) => {
  const {postId, id} = comment
  const res = await fetch(`/api/comments/${id}/edit`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(content)
  });

  if(res.ok) {
      const updatedComment = await res.json();
      dispatch(editCommentAction(updatedComment, postId, id))
      return updatedComment
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
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(post)
    body: post
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

export const userPostsThunk = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/users/${userId}`);
    const posts = await res.json()
    await dispatch(userPostsAction(posts))
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
    return updatedPost;
  }
}

const initialState = { allPosts: {}, singlePost: {}, userPosts: {} }

const postReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case USER_POSTS:
      let myPosts = { ...state, userPosts: {} };
      action.payload.forEach(post => myPosts.userPosts[post.id] = post);
      return myPosts;
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
      let aState = { ...state }
      aState.allPosts[action.payload.id].content = action.payload.content;
      // TODO: work on ability to edit pictures
      // aState.allPosts[action.payload.id].postImages = [...action.payload.postImages];
      return aState
    case ADD_COMMENT:
      const someState =  { ...state, allPosts: {
        ...state.allPosts,
        [action.payload.postId]: {
          ...state.allPosts[action.payload.postId],
          comments: [...state.allPosts[action.payload.postId].comments, action.payload]
        }
      }}

      return someState;
    case EDIT_COMMENT:

      return { ...state, allPosts: {
        ...state.allPosts,
        [action.payload.postId]: {
          ...state.allPosts[action.payload.postId],
          comments: state.allPosts[action.payload.postId].comments.map(comment => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                content: action.payload.updatedComment.content
              };
            }
            return comment
          })
        }
      }};

    case DELETE_COMMENT:
      const { postId, commentId } = action.payload
      let newCommentsState = { ...state }
      let postComments = newCommentsState.allPosts[postId].comments
      let newCommentsList = postComments.filter(comment => comment.id !== commentId)

      newCommentsState.allPosts[postId].comments = newCommentsList

      return { ...state, allPosts: newCommentsState.allPosts }

    case CREATE_LIKE:
      const { user } = action.payload
      const { firstName, id, lastName, profilePicURL } = user;
      return { ...state, allPosts: {
        ...state.allPosts,
        [action.payload.postId]: {
          ...state.allPosts[action.payload.postId],
          numLikes: state.allPosts[action.payload.postId].numLikes = state.allPosts[action.payload.postId].numLikes + 1,
          likedBy: [
            ...state.allPosts[action.payload.postId].likedBy,
            {firstName, id, lastName, profilePicURL}
          ]
        }
      }}

    case REMOVE_LIKE:
      return { ...state, allPosts: {
        ...state.allPosts,
        [action.payload.postId]: {
          ...state.allPosts[action.payload.postId],
          numLikes: state.allPosts[action.payload.postId].numLikes = state.allPosts[action.payload.postId].numLikes - 1,
          likedBy: [...state.allPosts[action.payload.postId].likedBy.filter(liker => liker.id !== action.payload.user.id)]
        }
      }}

    case CLEAN_UP:
      return { allPosts: {}, singlePost: {} }

    default:
      return state;
  }
}

export default postReducer
