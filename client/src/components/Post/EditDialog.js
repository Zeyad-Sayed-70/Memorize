import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { Col, Row } from "react-bootstrap";
import { FilledInput, InputLabel } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { updatePost } from "../../actions/posts";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      900,
      "JPEG",
      10000,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      300,
      300
    );
  });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ post }) {
  const [open, setOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    creator: "",
    title: `${post?.title}`,
    tags: [...post?.tags],
    message: `${post?.message}`,
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {};

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    let cleanPost = {};

    Object.keys(editedPost).forEach((key) => {
      if (editedPost[key].length) {
        // console.log(editedPost[key]);
        cleanPost = { ...cleanPost, [key]: editedPost[key] };
      }
    });

    dispatch(updatePost(e.target.id, cleanPost));
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ minWidth: "130px", display: "block" }}
        onClick={handleClickOpen}
      >
        <EditIcon /> <span className="ms-2">Edit</span>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit your Post
        </BootstrapDialogTitle>
        <form
          id={post?._id}
          onSubmit={(e) => {
            handlerSubmit(e);
          }}
        >
          <DialogContent dividers>
            <Row className="flex-wrap">
              <Col className="col-12 my-2">
                <InputLabel htmlFor="component-filled">Title</InputLabel>
                <FilledInput
                  className="w-100"
                  id="component-filled"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                />
              </Col>
              <Col className="col-12 my-2">
                <InputLabel htmlFor="component-filled">Description</InputLabel>
                <FilledInput
                  className="w-100"
                  id="component-filled"
                  value={editedPost.message}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, message: e.target.value })
                  }
                />
              </Col>
              <Col className="col-12 my-2">
                <InputLabel htmlFor="component-filled">Tags</InputLabel>
                <FilledInput
                  className="w-100"
                  id="component-filled"
                  value={editedPost.tags.join(" ")}
                  onChange={(e) =>
                    setEditedPost({
                      ...editedPost,
                      tags: e.target.value.split(" "),
                    })
                  }
                />
              </Col>
              <Col>
                <input
                  type="file"
                  onChange={async (file) => {
                    console.log(file.target.files[0]);
                    const image = await resizeFile(file.target.files[0]);
                    setEditedPost({
                      ...editedPost,
                      selectedFile: image,
                    });
                  }}
                />
              </Col>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
