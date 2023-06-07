const ALL_LIKES_USER = "likes/allLikesUser";
const ALL_POST_LIKES = "likes/allPostLikes";
const LIKE_POST = "likes/likePost";
const REMOVE_LIKE = "likes/removeLike";

// don't know if what we're passing into these are right???
const getUserLikesAction = (likedPosts) => ({
  type: ALL_LIKES_USER,
  payload: likedPosts,
});

const getPostLikesAction = (postLikes) => ({
  type: ALL_POST_LIKES,
  payload: postLikes,
});

const likePostAction = (postId) => ({
  type: LIKE_POST,
  payload: postId,
});

const removeLikeAction = (postId) => ({
  type: REMOVE_LIKE,
  payload: postId,
});

//Don't even know how this is going to work??
export const getUserLikeThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/likes/users/${userId}`);
  if (res.ok) {
    const likedPosts = await res.json();
    dispatch(getUserLikesAction(likedPosts));
    return likedPosts;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const getPostLikeThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/posts/${postId}`);
  if (res.ok) {
    const postLikes = await res.json();
    dispatch(getPostLikesAction(postLikes));
    return postLikes;
  } else {
    const errors = res.json();
    return errors;
  }
};

export const likePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/posts/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postId),
  });
  if (res.ok) {
    const likePost = await res.json();
    dispatch(likePostAction(likePost));
    return res;
  } else {
    const errors = res.json();
    return errors;
  }
};

export const removeLikeThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const deletedPost = await res.json();
    dispatch(removeLikeAction(deletedPost));
    return deletedPost;
  } else {
    const errors = res.json();
    return errors;
  }
};

//What is the state suppose to be??? LETS DISCUSS!
const initialState = {};
const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_LIKES_USER:
      null;
    case ALL_LIKES_USER:
      null;
    case LIKE_POST:
      null;
    case REMOVE_LIKE:
      null;
    default:
      return state;
  }
};

export default likeReducer;
