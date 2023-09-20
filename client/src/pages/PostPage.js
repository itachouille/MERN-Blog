import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_URL}/post/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        setPostInfo(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!postInfo) {
    return null;
  }

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
};

export default PostPage;
