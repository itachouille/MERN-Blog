import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();

    const data = {
      title,
      summary,
      content,
    };

    const response = await fetch("https://hhttf0-5000.csb.app/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
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
          <button className="button">Create Post</button>
        </div>
      </div>
    </form>
  );
}
