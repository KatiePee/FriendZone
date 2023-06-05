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
