import { Alert, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import AuthStyled from "./Auth.styled";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { postSignup, postSignin } from "../../actions/accounts";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";

// auth validation with yup
// build yup schema for register
const registerYupSchema = yup.object({
  firstName: yup.string().max(8).required(),
  lastName: yup.string().max(8).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(16).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// build yup schema for login
const loginYupSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Auth = ({ type }) => {
  const [sign, setSign] = useState(type);
  const [passwordType, setPasswordType] = useState("visibleoff");
  const loginValid = useSelector((state) => state.accountReducer);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sign === "up" ? registerYupSchema : loginYupSchema),
  });

  let interval;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (sign === "up") {
      if (interval) clearInterval(interval);
      dispatch(postSignup(data));
      interval = setInterval(() => {
        if (JSON.parse(localStorage.getItem("profile")))
          navigate("/", { replace: true });
        window.location.reload();
      }, 500);
    } else {
      if (interval) clearInterval(interval);
      dispatch(postSignin(data));
    }
  };

  useEffect(() => {
    if (sign === "in") {
      if (loginValid?.message) {
        console.log(loginValid, "1");
        setAlertMessage("email or password is not correct");
      }

      if (loginValid?.firstName) {
        console.log(loginValid, "2");
        setAlertMessage("");
        interval = setInterval(() => {
          if (JSON.parse(localStorage.getItem("profile")))
            navigate("/", { replace: true });
          window.location.reload();
        }, 500);
      }
    }
  }, [loginValid]);

  const googleSuccsess = async (res) => {
    console.log(res);
  };
  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <>
      <AuthStyled>
        <Row
          className="bg-light mx-auto mt-5 flex-wrap py-5"
          style={{ maxWidth: "400px" }}
        >
          {alertMessage && (
            <Alert severity="error" className="mb-3">
              {" "}
              {alertMessage}
            </Alert>
          )}
          <Col className="col-12 text-center mb-3 mx-auto">
            {sign === "in" ? (
              <LoginIcon className="fs-1 text-primary" />
            ) : (
              <LockOpenIcon className="fs-1 text-primary" />
            )}
          </Col>
          <Col className="text-center mb-3">
            <h3>{sign === "in" ? "Sign In" : "Sign Up"}</h3>
          </Col>
          {/* First & Last Name */}
          {sign === "up" && (
            <Row className="ms-0 px-0">
              <Col className="col-6">
                <TextField
                  {...register("firstName")}
                  label="First Name"
                  className="w-100 my-2"
                />
                <p>
                  {errors.firstName?.type === "required"
                    ? "first name is required field"
                    : ""}
                  {errors.firstName?.type === "max"
                    ? "first name should be smaller than 9 letters"
                    : ""}
                </p>
              </Col>
              <Col className="col-6">
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  className="w-100 my-2"
                />
                <p>
                  {errors.lastName?.type === "required"
                    ? "last name is required field"
                    : ""}
                  {errors.lastName?.type === "max"
                    ? "last name should be smaller than 9 letters"
                    : ""}
                </p>
              </Col>
            </Row>
          )}
          <Col className="col-12">
            <TextField
              {...register("email")}
              label="Email"
              className="w-100 my-2"
            />
            <p>{errors.email?.message}</p>
          </Col>
          <Col className="passFeild col-12">
            <TextField
              {...register("password")}
              label="Password"
              type={passwordType === "visible" ? "text" : "password"}
              className="w-100 my-2"
            />
            <div
              className="passType"
              onClick={() =>
                setPasswordType((prev) =>
                  prev === "visible" ? "visibleoff" : "visible"
                )
              }
            >
              {passwordType === "visible" ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </div>
          </Col>
          <p>{errors.password?.message}</p>
          {sign === "up" && (
            <Col className="col-12">
              <TextField
                {...register("passwordConfirmation")}
                label="Confirm Password"
                type="password"
                className="w-100 my-2"
              />
              <p>{errors.passwordConfirmation?.message}</p>
            </Col>
          )}
          {/* Google Login */}
          {/* <GoogleLogin
          clientId="482146564043-qh6ni3mj0db7evfejm87r7d69ev4r94u.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={(res) => googleSuccsess(res)}
          onFailure={(err) => googleFailure(err)}
          cookiePolicy={`single_host_origin`}
          isSignedIn={true}
        /> */}
          <Button
            variant="contained"
            className="mt-3 mx-auto col-5"
            onClick={handleSubmit(onSubmit)}
          >
            {sign === "in" ? "Sign In" : "Sign Up"}
          </Button>
          <Col className="col-12 mt-2 text-center">
            {sign === "in"
              ? "you don't have account?"
              : "you have account already"}{" "}
            <a href={sign === "in" ? "/SignUp" : "/SignIn"}>
              {sign === "in" ? "Sign Up" : "Sign In"}
            </a>
          </Col>
        </Row>
      </AuthStyled>
    </>
  );
};

export default Auth;
