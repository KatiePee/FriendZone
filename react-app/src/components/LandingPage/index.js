import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import title from "../../assets/friendzone-title.png";
import "./landingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const formErrors = {};
      // console.log("🚀 ~ file: index.js:21 ~ handleSubmit ~ data:", data)
      for (let err of data) {
        // console.log("🚀 ~ file: index.js:23 ~ handleSubmit ~ err:", err)
        if (err.startsWith("email")) {
          formErrors.email = err.slice(8);
          // console.log('email error', err.slice(8));
        } else if (err.startsWith("password")) {
          formErrors.password = err.slice(11);
          // console.log('pw error', err.slice(11));
        }
      }
      setErrors(formErrors);
      console.log("🚀 ~ file: index.js:37 ~ handleSubmit ~ errors:", errors);
      return;
    }
    history.push(`/home`);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    history.push(`/home`);
  };

  const demoUser2 = async (e) => {
    e.preventDefault();
    await dispatch(login("marnie@aa.io", "password"));
    history.push(`/home`);
  };

  const demoUser3 = async (e) => {
    e.preventDefault();
    await dispatch(login("bobbie@aa.io", "password"));
    history.push(`/home`);
  };

  return (
    <div className="whole-page">
      <body>
        <div className="landing-container">
          <div className="left-side">
            <div className="logo">
              <img src={title} className="friendzone" alt="logo" />
            </div>
            <h3 className="slogan">A place where you can force a friendship</h3>
            <p>Click a demo user or create an account</p>
            <div className="demo-user-stuff">
              <div onClick={demoUser} className="demo-card">
                <img
                  src="https://marketplace.canva.com/EAE_4-ugJng/1/0/1600w/canva-blue-yellow-simple-professional-instagram-profile-picture-kpwvs_syWG8.jpg"
                  className="demo-face"
                  alt="demo-1"
                />
                <div className="demo-name">Demo User</div>
              </div>
              <div onClick={demoUser2} className="demo-card">
                <img
                  src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
                  className="demo-face"
                  alt="demo-2"
                />
                <div className="demo-name">Marnie Demo</div>
              </div>
              <div onClick={demoUser3} className="demo-card">
                <img
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  className="demo-face"
                  alt="demo-3"
                />
                <div className="demo-name">Bobbie Demo</div>
              </div>
            </div>
          </div>

          <div className="login-form">
            <form onSubmit={handleSubmit} className="form-info">
              <div className="email-div">
                <label>
                  <input
                    className="input-info"
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="errors">{errors.email}</p>
                </label>
              </div>
              <div className="password-div">
                <label>
                  <input
                    className="input-info"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="errors">{errors.password}</p>
                </label>
              </div>
              <button className="login-btn" type="submit">
                Log In
              </button>
            </form>
            <div className="sign-up">
              <OpenModalButton
                buttonText="Create New Account"
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default LandingPage;
