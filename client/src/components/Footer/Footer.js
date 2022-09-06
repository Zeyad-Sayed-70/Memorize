import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FooterStyled from "./FooterStyled.styled";
import UseFormControl from "./FeedBack";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <>
      <FooterStyled>
        <Row>
          <Col className="mx-auto w-100">
            <UseFormControl />
          </Col>
          <Col className="col-12 nav">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Memorise</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">FeedBack</a>
              </li>
            </ul>
          </Col>
          <Col className="col-12 media d-flex justify-content-center gap-3">
            <span>
              <WhatsAppIcon />
            </span>
            <span>
              <GitHubIcon />
            </span>
            <span>
              <GoogleIcon />
            </span>
            <span>
              <LinkedInIcon />
            </span>
          </Col>
          <Col className="col-12">
            <h4 className="me-5 mt-4 text-light text-center">GET IN TOUCH</h4>
          </Col>
          <Row className="copyright mt-5">
            <Container className="d-flex flex-wrap px-5 align-items-center">
              <Col className="col-12 col-md-6">
                <span>2022 All Rights Designed by Zeyad Sayed</span>
              </Col>
              <Col className="col-12 d-none d-md-block col-md-6">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Mneu</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">News</a>
                  </li>
                </ul>
              </Col>
            </Container>
          </Row>
        </Row>
      </FooterStyled>
    </>
  );
};

export default Footer;
