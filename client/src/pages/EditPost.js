import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/helpers";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirectPost, setRedirectPost] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = {
      title,
      summary,
      content,
    };
    const response = await fetchFromApi(`post/${id}`, {
      method: "PATCH",
      body: data,
    });
    if (response.status !== 200) {
      const errors = response.data.errors;
      console.error(errors);
    } else {
      setRedirectPost(true);
    }
  }

  async function deletePost() {
    const response = await fetchFromApi(`post/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      const errors = response.data.errors;
      console.error(errors);
    } else {
      setRedirectHome(true);
    }
  }

  if (redirectPost) {
    return <Navigate to={"/post/" + id} />;
  }

  if (redirectHome) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form-container">
      <form onSubmit={updatePost}>
        {errors && errors.length > 0 && (
          <div className="error">
            <ul>
              {errors.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        )}
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
          <button className="button">Update Post</button>
        </div>
      </form>
      <div>
        <button className="button" onClick={() => deletePost()}>
          Delete post
        </button>
      </div>
    </div>
  );
}
