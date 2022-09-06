import { Col, Row } from "react-bootstrap";
import { TextField, Button, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostsBySearch, getPosts } from "../../../actions/posts";

const SearchForm = ({ page, setIsLoading }) => {
  const [searchData, setSearchData] = useState({ search: "", tags: [] });
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navegate(
      `/posts/search?searchQuery=${searchData.search || "none"}&tags=${
        searchData.tags.join(",") || "none"
      }&page=${page}`
    );

    if (searchData.search === "" && !searchData.tags.length) {
      // console.log(true);
      dispatch(getPosts());
    }

    if (searchData.search.trim() || searchData.tags)
      dispatch(getPostsBySearch(searchData, page));

    setIsLoading(true);
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(" "));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#eeeeee",
          boxShadow: "1px 1px 5px 1px #33333338",
        }}
      >
        <Col className="mb-3 p-4">
          <TextField
            label="search"
            fullWidth
            className="mb-3 bg-light"
            onChange={(e) =>
              setSearchData({ ...searchData, search: e.target.value })
            }
          />
          <TextField
            label="tags ex: travel food"
            fullWidth
            className="mb-3 bg-light"
            onChange={handleTags}
            onBlur={(e) => {
              setSearchData({
                ...searchData,
                tags: [...searchData.tags, ...tags],
              });
              e.target.value = "";
              setTags([]);
            }}
          />
          <Row className="tags flex-wrap mb-3 px-2">
            {searchData.tags.map((tag) => {
              if (tag !== "")
                return (
                  <Chip
                    key={tag}
                    className="mb-1 mx-1"
                    label={tag?.toUpperCase()}
                    style={{
                      width: "auto",
                      fontWeight: "bold",
                      color: "#777",
                    }}
                    onClick={(e) => {
                      let arr = searchData;
                      arr.tags.splice(searchData.tags.indexOf(tag), 1);
                      setSearchData(arr);
                      e?.target?.remove();
                    }}
                  />
                );
            })}
          </Row>
          <Button type="submit" variant="contained" className="mx-auto">
            Search
          </Button>
        </Col>
      </form>
    </>
  );
};

export default SearchForm;
