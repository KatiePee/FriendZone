import React, { useSelector, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allPostsThunk } from "../../store/posts";

function HomePage() {
  const dispatch = useDispatch();
  console.log('---------------before useselector---------')
  // const postsState = useSelector(state => state.posts.allPosts)

  // const posts = postsState ? Object.values(postsState) : [];
  console.log('---------------after useselector---------')


  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch])

  // if (!posts.length) return null;
  return (<h1>HomePage!</h1>)
  // return (
  //   <div className="landing-page-wrapper">
  //     {posts.map(post => (
  //       // <SpotCard spot={spot} key={spot.id} />
  //       <h3>{post.content}</h3>
  //     ))}
  //   </div>
  // )
}
export default HomePage

