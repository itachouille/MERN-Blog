import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirectPost, setRedirectPost] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    fetch(`https://hhttf0-5000.csb.app/post/${id}`).then((response) => {
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
    const response = await fetch(`https://hhttf0-5000.csb.app/post/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setRedirectPost(true);
    }
  }

  if (redirectPost) {
    return <Navigate to={"/post/" + id} />;
  }

  async function deletePost() {
    const response = await fetch(`https://hhttf0-5000.csb.app/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setRedirectHome(true);
    }
  }

  if (redirectHome) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form-container">
      <form onSubmit={updatePost}>
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
