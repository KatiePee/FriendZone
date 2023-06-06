const ALL_POSTS = 'posts/allPosts'
const SINGLE_POST = 'posts/singlePosts'
const DELETE_POST = 'posts/deletePost'

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

export const deletePostThunk = (postId) => async dispatch => {
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

export const currentUserPostsThunk = () => async (dispatch) => {
  try {
    const res = await fetch('/api/posts/current');
    const posts = await res.json()
    dispatch(allPostsAction(posts))
    return res
  } catch (e) {
    return null
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
    default:
      return state;
  }
}

export default postReducer
// const CREATE_POST = "posts/CREATE_POST";

// const createPostAction = (post) => {
//   return {
//     type: CREATE_POST,
//     post
//   };
// };

// export const createPostThunk = (content) => async (dispatch) => {
//   const response = await fetch("/api/spots/new", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       content,
//       // add ability to add photos
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(createPostAction(data));
//   } else {
//     return "Cannot Create A New Post!";
//   }
// };


// export default function postReducer(state = initialState, action) {
//     switch (action.type) {
//         case CREATE_POST:
//            pass
//     }
// }
