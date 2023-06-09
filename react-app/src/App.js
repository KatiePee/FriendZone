import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import LandingPage from "./components/LandingPage";
import NonExistent from "./components/NonExistentPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if (user) history.push("/home");

  return (

  <>
  {(user && isLoaded) ?(
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/users/:userId">
          <UserProfile />
        </Route>
        <Route>
          <NonExistent />
        </Route>
      </Switch>
    </>
  ):(
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route>
          <NonExistent />
        </Route>
      </Switch>
    </>
  )
  }
</>

//     <>
//     {/* {!user ? (
//       <div>
//         <div>
//           <Switch>
//             <Route exact path="/">
//               <LandingPage />
//             </Route>
//             <Route>
//               <h2>Page Could Not Be Found or Does Not EXIST!</h2>
//             </Route>
//           </Switch>
//         </div>
//       </div>

//       ) : (
//       <div style={{ backgroundColor: "#F0F2F5" }}>
//           <Navigation isLoaded={isLoaded} />
//           {isLoaded && (
//             <Switch>
//               <Route path="/signup">
//                 <SignupFormPage />
//               </Route>
//               <Route path="/home">
//                 <HomePage />
//               </Route>
//               <Route path="/:userId">
//                 <UserProfile />
//               </Route>
//             </Switch>
//           )}
//       </div>
//       )} */}
//   {user ? <Navigation isLoaded={isLoaded} /> : null}
//       <Switch>
//   <Route exact path="/">
//     {!user ? <LandingPage /> : <Redirect to="/home" />}
//   </Route>
//   <Route path="/home">
//     {user ? <HomePage /> : <Redirect to="/" />}
//   </Route>
//   <Route path="/signup">
//     <SignupFormPage />
//   </Route>
//   <Route exact path="/users/:userId">
//   {user ? <UserProfile /> : <NonExistent />}
//     <UserProfile />
//   </Route>
//   <Route>
//     <NonExistent />
//   </Route>
// </Switch>
//     </>

  );
}

export default App;
