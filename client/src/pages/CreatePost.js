import { useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchFromApi } from "../utils/helpers";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  async function createNewPost(e) {
    e.preventDefault();
    const data = {
      title,
      summary,
      content,
    };
    const response = await fetchFromApi(`post`, {
      body: data,
    });
    if (response.status !== 201) {
      const errors = response.data.errors;
      setErrors(errors);
    } else {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      {errors && errors.length > 0 && (
        <div className="error">
          <ul>
            {errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-container">
        <div className="form-body">
          <input
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <textarea
            cols="30"
            rows="15"
            className="textarea"
            type="text"
            placeholder={"Content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-footer">
          <button className="button" type="submit">
            Create Post
          </button>
        </div>
      </div>
    </form>
  );
}
