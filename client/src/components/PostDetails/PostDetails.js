import { Col, Container, Row, Spinner } from "react-bootstrap";
import PostDetailsStyled from "./PostDetailsStyled.styled";
import moment from "moment";
import "../../App.css";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import Comments from "../Comment/Comments";
import Post from "../Post/Post";
import { Chip } from "@mui/material";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { posts, post } = useSelector((state) => state.postsReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    dispatch(getPost(id));
    setIsFetch(true);
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: "none", tags: post[0]?.tags }));
    }

    if (isFetch) {
      setLoading(false);
    }
  }, [post]);

  let recommendation;
  if (post?.length) {
    recommendation = posts?.length && posts?.filter((post) => post._id != id);
  }

  if (loading || !post) {
    return (
      <Col className="text-center w-100 mt-5">
        <Spinner animation="border" variant="primary" />
      </Col>
    );
  }

  return (
    <PostDetailsStyled>
      <Container>
        <Row className="content">
          {/* info side */}
          <Col className="info-side px-md-5 mt-4 mt-md-0">
            <h3 className="text-dark">{post[0]?.title}</h3>
            <p className="text-secondary">{post[0]?.message}</p>
            <div className="text-secondary mb-3">
              {post[0]?.tags?.map((tag) => (
                <span key={tag} className="mx-1">
                  <Chip className="text-uppercase mt-2" label={tag} />
                </span>
              ))}
            </div>
            <span className="d-block">
              Created By: <span className="fw-bold">{post[0]?.creator}</span>
            </span>
            <span className="d-block">
              {moment(post[0]?.createAt).fromNow()}
            </span>
            <hr />
            <span className="fw-bold">Realtime Chat - comming soon</span>
            <hr />
            <Row>
              <Comments post={post[0]} />
            </Row>
          </Col>
          {/* img side */}
          <Col className="p-md-5 img-side col-12">
            <img
              className="w-100"
              src={post[0]?.selectedFile || "../memorise1.jpg"}
              alt={post[0]?.title}
            />
          </Col>
        </Row>
        <Row className="content">
          {recommendation ? (
            <>
              <Col className="recommends d-flex flex-wrap mt-3 col-12">
                <h5 className="text-secondary my-3 d-block w-100">
                  You might also like:
                </h5>
                {recommendation.map((reco) => (
                  <Post key={reco.title} post={reco} profile={profile} />
                ))}
              </Col>
            </>
          ) : (
            <Col className="text-center w-100 mt-5 col-12">
              <Spinner animation="border" variant="primary" />
            </Col>
          )}
        </Row>
      </Container>
    </PostDetailsStyled>
  );
};

export default PostDetails;
