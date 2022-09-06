import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import { Col } from "react-bootstrap";

function Media(props) {
  const { loading = false } = props;

  return (
    <Col className="col-12 col-md-6 col-lg-4" style={{ height: "420px" }}>
      <div className="mb-3">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={200}
        />
      </div>
      <div>
        <Skeleton animation="wave" width={"30%"} height={20} />
      </div>
      <div className="my-3">
        <Skeleton animation="wave" width={"100%"} height={20} />
        <Skeleton animation="wave" width={"100%"} height={20} />
        <Skeleton animation="wave" width={"80%"} height={20} />
      </div>
      <div className="mt-5">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={100}
          height={20}
        />
      </div>
    </Col>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function PostLoading() {
  return <Media loading />;
}
