import { useState } from "react";
import { Button } from "@mui/material";
import { Col } from "react-bootstrap";
import NavbarStyled from "./NavbarStyled.styled";
import AlertDialog from "./AlertDialog";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

export default function PrimarySearchAppBar() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  return (
    <NavbarStyled>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            className="text-light"
            style={{ backgroundColor: "#010b17 " }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <a
                href="/"
                className="text-light ms-auto"
                style={{ textDecoration: "none" }}
              >
                MEMORISE
              </a>
            </Typography>
            {/* Profile info */}
            {profile && (
              <Col className="profile-info ms-auto me-3 me-md-5 d-flex align-items-center col-6 col-md-2">
                <div>
                  <AlertDialog profile={profile} />
                </div>
                <h5 className="m-0 ms-3">{`${profile?.firstName} ${profile?.lastName}`}</h5>
              </Col>
            )}
            {/* sign in & logout buttons */}
            {JSON.parse(localStorage.getItem("profile")) ? (
              <Button
                variant="contained"
                color="error"
                className=""
                onClick={() => {
                  localStorage.removeItem("profile");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <a
                href="/SignIn"
                className="text-light ms-auto"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained">Sign In</Button>
              </a>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </NavbarStyled>
  );
}
