import { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import CommentsStyled from "./CommentsStyled.styled";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  useEffect(() => {
    setComments(post.comments);
  }, [post]);

  const handleComment = async (e) => {
    if (comment) {
      const newComment = `${user.firstName} ${user.lastName}: ${comment}`;
      setComment("");
      dispatch(commentPost(post._id, newComment));
      setComments([...comments, newComment]);
    }
  };
  return (
    <CommentsStyled>
      <Row>
        <Col className="col-4" style={{ maxHeight: "200px", overflow: "auto" }}>
          {comments.map((val, i) => (
            <span key={i} className="d-block">
              {val}
            </span>
          ))}
        </Col>
        <Col className="col-8">
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows={3}
            value={comment}
            style={{ width: "100%", height: "120px" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="w-100"
            variant="contained"
            disabled={!user}
            onClick={handleComment}
          >
            Comment
          </Button>
        </Col>
      </Row>
    </CommentsStyled>
  );
};

export default Comments;
