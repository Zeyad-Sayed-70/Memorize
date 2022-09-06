import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import PostLoading from "./skeletonLoading";

const Posts = ({ isFetch }) => {
  const [loading, setLoading] = useState(true);
  const { posts } = useSelector((state) => state.postsReducer);

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    if (isFetch) {
      setLoading(false);
    }
  }, [posts]);

  if (loading || posts?.length === 0) {
    return (
      <Row className="flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((post, i) => (
          <PostLoading key={i} />
        ))}
      </Row>
    );
  }

  return (
    <>
      <Row className="d-flex flex-wrap">
        {posts?.length &&
          posts?.map((post) => {
            // console.log(post);
            if (post) {
              return <Post key={post._id} post={post} profile={profile} />;
            }
          })}
      </Row>
    </>
  );
};

export default Posts;
