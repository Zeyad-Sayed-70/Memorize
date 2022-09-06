import { TextField, Button } from "@mui/material";
import { useState } from "react";
import FileBase from "react-file-base64";
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

const PostForm = ({ handlerSubmit, newPost, setNewPost, clearForm }) => {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <div className="p-4">
      <h5 className="text-center">Create Post</h5>
      <form onSubmit={handlerSubmit}>
        <div className="mb-2">
          <TextField
            label="title"
            className="w-100 my-2 bg-light"
            value={newPost.title}
            onChange={(e) => {
              setNewPost({ ...newPost, title: e.target.value });
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="description"
            multiline
            rows={6}
            className="h-100 my-2 bg-light"
            value={newPost.message}
            style={{ width: "100%", height: "150px" }}
            onChange={(e) => {
              setNewPost({ ...newPost, message: e.target.value });
            }}
          />
          <TextField
            label="tags"
            className="w-100 my-2 bg-light"
            value={newPost.tags.join(" ")}
            onChange={(e) => {
              setNewPost({ ...newPost, tags: e.target.value.split(" ") });
            }}
          />
          <div className="w-100 my-2 d-flex" style={{ fontSize: "12px" }}>
            <input
              type="file"
              onChange={async (file) => {
                console.log(file.target.files[0]);
                const image = await resizeFile(file.target.files[0]);
                setNewPost({ ...newPost, selectedFile: image });
                setImgUrl(image);
              }}
            />
            <div style={{ width: "100px", height: "auto" }}>
              <img className="w-100 align-items-center" src={imgUrl} />
            </div>
          </div>
        </div>

        <Button className="mt-2" type="submit" variant="contained" fullWidth>
          Submit
        </Button>
        <Button
          style={{ height: "30px" }}
          variant="contained"
          color="error"
          className="mt-2"
          fullWidth
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
