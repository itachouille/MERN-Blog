import Post from "../components/Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(`${process.env.BACK_URL}/posts`);
    fetch(`${process.env.BACK_URL}/posts`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setPosts(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
    </div>
  );
}
