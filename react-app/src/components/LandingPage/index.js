import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from '../OpenModalButton'
import SignupFormModal from "../SignupFormModal";
import "./landingPage.css"

function LandingPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/home" />;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    };

    const demoUser = e => {
        e.preventDefault()
        return dispatch(login("demo@aa.io", "password"))
    }

    return (
    <div className= "landing-container">
        <div className="left-side">
            <h1>FriendZone</h1>
            <div className="contributors">
                <h3>Contributors:</h3>
                    <div>Adanna Liu</div>
                    <div>Albert Kim</div>
                    <div>Katie Piele</div>
                    <div>PJ Singh</div>
            </div>
        </div>

        <div className="login-signup">
            <div className="form-area">
                <form onSubmit={handleSubmit}>
                    <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                    </ul>
                    <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </label>
                    <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    <div className="login-button">
                        <button className="submit-button" type="submit">Log In</button>
                    </div>
                </form>
            </div>

                <button onClick={demoUser} className="demo-button">Demo User</button>
            <div className="sign-up">
                <OpenModalButton
                    buttonText={`Create New Account`}
                    modalComponent={<SignupFormModal />}
                />
            </div>

        </div>


    </div>
    )
}


export default LandingPage
