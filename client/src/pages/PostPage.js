import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://hhttf0-5000.csb.app/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="postPage-container">
      <div className="postPage-header">
        <div className="postPage-header-left">
          <h2>{postInfo.title}</h2>
          <time>{format(new Date(postInfo.createdAt), "dd/MM/yyyy")}</time>
        </div>
        <div className="postPage-header-right">
          <Link to={`/edit/${postInfo._id}`}>
            <button className="button">Edit this post</button>
          </Link>
        </div>
      </div>
      <div className="postPage-image">
        <img
          className="image"
          src="https://picsum.photos/600/400"
          alt="picture"
        />
      </div>
      <div className="postPage-content">{postInfo.content}</div>
    </div>
  );
}
