import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {user ? (
      <div style={{ backgroundColor: "#F0F2F5" }}>
      <Navigation isLoaded={isLoaded} />
      {(isLoaded && user) && (
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/:userId">
            <UserProfile />
          </Route>
        </Switch>
      )}
  </div>
      ) : (
        <div>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </div>
      )}
    </>
  );
}

export default App;
