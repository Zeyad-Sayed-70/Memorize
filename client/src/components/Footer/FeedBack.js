import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button } from "@mui/material";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postFeedBack } from "../../actions/feedback";

const feedbackSchema = {
  sendBy_name: "",
  sendBy_id: "",
  sendBy_img: "",
  message: "",
};

export default function HelperTextMisaligned() {
  const [feedback, setFeedback] = useState(feedbackSchema);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  useEffect(() => {
    if (profile?._id) {
      setFeedback({
        ...feedback,
        sendBy_name: `${profile.firstName} ${profile.lastName}`,
        sendBy_id: profile._id,
        sendBy_img: profile.profile_img,
      });
    }
  }, []);

  const handleSubmit = () => {
    if (feedback.message !== "") {
      dispatch(postFeedBack(feedback));
      setAlert(true);
    }
  };

  return (
    <>
      {alert && (
        <div className="col-12 col-md-6  col-lg-4 mx-auto mb-5 ">
          <Alert
            severity="success"
            style={{ backgroundColor: "#183a1d", color: "#fff" }}
          >
            This is a success Submited — check it out!
          </Alert>
        </div>
      )}
      <Box
        className="feedback flex-wrap col-12 col-md-6 mx-auto m-5"
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
        }}
      >
        <div className="box box-1"></div>
        <div className="box box-2"></div>
        <div className="cont bg-light justify-content-center flex-wrap p-5">
          <h3 className="text-center text-dark fs-4">
            If you have any idea to improve Memorise website, just tell us what
            your feedback
          </h3>
          <Col className="d-flex flex-wrap">
            <Col className="feedback_input col-12 col-md-8">
              <TextField
                helperText="Please give us your feedback 💗"
                id="demo-helper-text-misaligned"
                label="FeedBack"
                fullWidth
                style={{ borderRadius: "4px 0 0 4px" }}
                onChange={(e) =>
                  setFeedback({ ...feedback, message: e.target.value })
                }
              />
            </Col>
            <Col className="col-5 mx-auto mt-3 m-md-0 col-md-4">
              <Button
                disabled={!profile && true}
                style={{
                  height: "56px",
                  width: "100%",
                  borderRadius: "0 4px 4px 0",
                }}
                variant="contained"
                color="warning"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Col>
        </div>
      </Box>
    </>
  );
}
