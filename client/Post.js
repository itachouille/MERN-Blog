import React from "react";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary }) => {
  return (
    <div className="post">
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="summary"> {summary} </p>
      </div>
    </div>
  );
};

export default Post;
