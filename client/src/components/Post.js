import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ _id, title, summary, createdAt }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${_id}`);
  }

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        <img
          className="image"
          src="https://picsum.photos/600/400"
          alt="article illustration"
        />
      </div>
      <div className="post-body">
        <h4>{title}</h4>
        <time>{format(new Date(createdAt), "dd/MM/yyyy")}</time>
        <p className="summary"> {summary} </p>
      </div>
    </div>
  );
};

export default Post;
