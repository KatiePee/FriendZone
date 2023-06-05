import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function PostFormModal() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 1) {
        fetch('/api/posts/new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content
            }),
        })
        .then(response => response.json())
        .then(data => console.log("THIS IS THE NEW POST", data))
        .then(closeModal())
    } else {
      setErrors([
        "Post Cannot Be Blank!",
      ]);
    }
  };

  return (
    <>
      <h1>What's on your mind?</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
			placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post</button>
      </form>
    </>
  );
}

export default PostFormModal;