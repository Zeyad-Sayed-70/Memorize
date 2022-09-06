import { useEffect, useState } from "react";
import { updateAccount } from "../../actions/accounts";
import { updatePosts } from "../../actions/posts";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Resizer from "react-image-file-resizer";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function AlertDialog({ profile }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {show && <ChangeDialog profile={profile} show={show} setShow={setShow} />}
      <div>
        <div
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            boxShadow: "0 0 5px 3px #aeaeae",
          }}
          onClick={handleClickOpen}
        >
          <Avatar
            {...stringAvatar(`${profile?.firstName} ${profile?.lastName}`)}
            alt={profile?.firstName}
            src={profile?.profile_img}
            sx={{ width: "36px", height: "36px", fontSize: "16px" }}
          />
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want change your profile image?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              When Change Your profile image the old image will delete and
              replace it with new one.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                setShow(true);
                setOpen(false);
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

// Resizer Function to resize imgs
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

function ChangeDialog({ profile, show, setShow }) {
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();
  const acc = useSelector((user) => user.accountReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (src) {
      window.location.reload();
    }
  }, [acc]);

  const handleSubmit = async () => {
    if (src) {
      const file = src.target.files[0];
      const image = await resizeFile(file);
      dispatch(updateAccount({ profile_img: image }, profile._id));
      dispatch(updatePosts(image, profile._id));
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select New Profile Image:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input type="file" onChange={(file) => setSrc(file)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
