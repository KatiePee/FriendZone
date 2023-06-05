import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, email, password, dateOfBirth, gender)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
			placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
			placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
			placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* <label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label> */}
        <label>
          <input
            type="password"
			placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
			placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <div>
          Gender
          <div>
            <label htmlFor="Male">Male</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="Female">Female</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
          <div>
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
