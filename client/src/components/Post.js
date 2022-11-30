import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ _id, title, summary, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src="./news.jpg" alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <time>{format(new Date(createdAt), "dd/MM/yyyy")}</time>
        </p>
        <p className="summary"> {summary} </p>
      </div>
    </div>
  );
};

export default Post;
