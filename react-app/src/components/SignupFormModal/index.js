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

  const _handelErrors = () => {

    firstName || (formErrors.firstName = 'firstName is required.');
    firstName.length > 1 || (formErrors.firstName = 'First name is required and must be at least 1 character.');
    firstName.length < 30 || (formErrors.firstName = 'First name is required and must be less than 30 characters.');
    lastName || (formErrors.lastName = 'lastName is required.');
    lastName.length > 1 || (formErrors.lastName = 'Last name is required and must be at least 1 character.');
    lastName.length < 30 || (formErrors.lastName = 'Last name is required and must be less than 30 characters.');
    email || (formErrors.email = 'email is required.');
    email.length < 30 || (formErrors.email = 'email is required and must be less than 50 characters.');
    password || (formErrors.password = 'password is required.');
    password.length < 225 || (formErrors.password = 'password is too long');
    confirmPassword || (formErrors.confirmPassword = 'confirmPassword is required.');
    password === confirmPassword || (formErrors.confirmPassword = 'passwords do not match');
    dateOfBirth || (formErrors.dateOfBirth = 'dateOfBirth is required.');
    gender || (formErrors.gender = 'gender is required.');
    setErrors(formErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    _handelErrors();

    if (!Object.values(formErrors).length) {
      const data = await dispatch(signUp(firstName, lastName, email, password, dateOfBirth, gender));
      if (data) {
        formErrors.validationErrors = data
        setErrors(formErrors)
      } else {
        history.push('/home')
        closeModal();
      }
    }
  }
  return (
    <div className="sign-up-container">
      <h1 className="sign-up-logo">Sign Up</h1>
      <form className="form-info-container">

        <p className='errors form__errors'>{errors.validationErrors}</p>

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
            <p className='errors form__errors'>{errors.firstName}</p>
          </label>


          <label>
            <input
              type="text"
              className="input-info"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <p className='errors form__errors'>{errors.lastName}</p>
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
            <p className='errors form__errors'>{errors.email}</p>
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
            <p className='errors form__errors'>{errors.password}</p>
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
            <p className='errors form__errors'>{errors.confirmPassword}</p>
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
          <p className='errors form__errors'>{errors.dateOfBirth}</p>
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
            <p className='errors form__errors'>{errors.gender}</p>

          </div>
        </div>
        <p className="disclosure">People who use our service may have uploaded your contact information to Friendzone.</p>
        <p className="disclosure">This is a fake website, so please do not upload personal info.</p>
        <button className="submit-button-2" type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
