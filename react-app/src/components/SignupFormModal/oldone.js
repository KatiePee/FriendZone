import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  let formErrors = {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      firstName || (formErrors.firstName = 'firstName is required.');
      firstName.length > 3 || (formErrors.firstName = 'First name is required and must be at least 1 character.');
      firstName.length < 30 || (formErrors.firstName = 'First name is required and must be less than 30 characters.');
      lastName || (formErrors.lastName = 'lastName is required.');
      lastName.length > 1 || (formErrors.lastName = 'Last name is required and must be at least 1 character.');
      lastName.length < 30 || (formErrors.lastName = 'Last name is required and must be less than 30 characters.');
      email || (formErrors.email = 'email is required.');
      email.length < 30 || (formErrors.email = 'email is required and must be less than 50 characters.');
      password || (formErrors.password = 'password is required.');
      password.length < 225 || (formErrors.password = 'password is too long');
      confirmPassword || (formErrors.confirmPassword = 'confirmPassword is required.');
      dateOfBirth || (formErrors.dateOfBirth = 'dateOfBirth is required.');
      gender || (formErrors.gender = 'gender is required.');

      if (!Object.values(formErrors).length) {
      }
      const data = await dispatch(signUp(firstName, lastName, email, password, dateOfBirth, gender));
      console.log('🤡~🤡~🤡~🤡~🤡~~~~~~~~~~~ sign up data errors obj', data)


      if (data) {
        setErrors(data);
      } else {
        history.push('/home')
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-logo">Sign Up</h1>
      <form onSubmit={handleSubmit} className="form-info-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="first-last">
          <label>
            <input
              type="text"
              className="input-info"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <p className='errors form__errors'>{errors.firstName}</p>


          <label>
            <input
              type="text"
              className="input-info"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="email-div">
          <label>
            <input
              className="input-info"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>


        {/* <label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label> */}



        <div className="password-div">
          <label>
            <input
              className="input-info"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="confirm-password-div">
          <label>
            <input
              type="password"
              className="input-info"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>


        <label>
          Birthday
          <input
            type="date"
            className="input-info"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>


        <div className="gender-field">
          Gender
          <div className="gender-field-area">
            <div className="male-section">
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div className="female-section">
              <label htmlFor="Female">Female</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div className="custom-section">
              <label htmlFor="Custom">Custom</label>
              <input
                type="radio"
                name="gender"
                value="Custom"
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>

          </div>
        </div>
        <p className="disclosure">People who use our service may have uploaded your contact information to Friendzone.</p>
        <p className="disclosure">This is a fake website, so please do not upload personal info.</p>
        <button className="submit-button-2" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
