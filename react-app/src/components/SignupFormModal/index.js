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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  let formErrors = {};

  const _handleErrors = () => {
    firstName || (formErrors.firstName = "First name is required.");
    firstName.length > 1 ||
      (formErrors.firstName =
        "First name is required and must be at least 1 character.");
    firstName.length < 30 ||
      (formErrors.firstName =
        "First name is required and must be less than 30 characters.");
    lastName || (formErrors.lastName = "Last name is required.");
    lastName.length > 1 ||
      (formErrors.lastName =
        "Last name is required and must be at least 1 character.");
    lastName.length < 30 ||
      (formErrors.lastName =
        "Last name is required and must be less than 30 characters.");
    email || (formErrors.email = "Email is required.");
    email.length < 30 ||
      (formErrors.email =
        "Email is required and must be less than 50 characters.");
    password || (formErrors.password = "Password is required.");
    password.length < 225 || (formErrors.password = "Password is too long");
    confirmPassword ||
      (formErrors.confirmPassword = "Confirm password is required.");
    password === confirmPassword ||
      (formErrors.confirmPassword = "Passwords do not match");
    dateOfBirth || (formErrors.dateOfBirth = "Date of birth is required.");
    gender || (formErrors.gender = "Gender is required.");
    setErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    _handleErrors();

    if (!Object.values(formErrors).length) {
      const data = await dispatch(
        signUp(firstName, lastName, email, password, dateOfBirth, gender)
        );
        if (data) {
          formErrors.validationErrors = data[0].slice(8);
        setErrors({ ...formErrors });
      } else {
        history.push("/home");
        closeModal();
      }
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-header">
        <div className="sign-up-header-line1">
          <h1 className="sign-up-title">Sign Up</h1>
          <i
            id="close-signup"
            onClick={closeModal}
            class="fas fa-times fa-lg"
          />
        </div>
        <p className="sign-up-subheader">It's quick and easy</p>
      </div>
      <form className="form-info-container">

        <div className="first-last">
          <label>
            <input
              type="text"
              className="input-info name-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="errors form__errors">{errors.firstName}</p>
          </label>

          <label>
            <input
              type="text"
              className="input-info name-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className="errors form__errors">{errors.lastName}</p>
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
            />
            <p className="errors form__errors">{errors.validationErrors}</p>
            <p className="errors form__errors">{errors.email}</p>
          </label>
        </div>
        <div className="password-div">
          <label>
            <input
              className="input-info"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="errors form__errors">{errors.password}</p>
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
            />
            <p className="errors form__errors">{errors.confirmPassword}</p>
          </label>
        </div>

        <label>
          Birthday
          <input
            type="date"
            className="input-info"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <p className="errors form__errors">{errors.dateOfBirth}</p>
        </label>

        <div className="gender-field">
          <div className="gender-label">
            <p>Gender</p>
            <p className="errors form__errors gender-error">{errors.gender}</p>
          </div>
          <div className="gender-field-area">
            <div className="male-section">
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="female-section">
              <label htmlFor="Female">Female</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="custom-section">
              <label htmlFor="Custom">Custom</label>
              <input
                type="radio"
                name="gender"
                value="Custom"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
        </div>
        <p className="disclosure">
          People who use our service may have uploaded your contact information
          to Friendzone.
        </p>
        <p className="disclosure">
          This is a fake website, so please do not upload personal info.
        </p>
        <div className="signup-btn-wrapper">
          <button className="signup-btn" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
