import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Posts from "../Posts/Posts";
import Form from "../Form/postForm/Form";
import SearchForm from "../Form/searchForm/Form";
import LayoutStyled from "./LayoutStyled.styled";
import { Pagination } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPosts } from "../../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import PostLoading from "../Posts/skeletonLoading";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Layout = () => {
  const query = useQuery();
  const [page, setPage] = useState(query.get("page") || 1);
  const [isLoading, setIsLoading] = useState(false);
  const { posts, count } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sectionRef = useRef();
  const [formSticky, setFormSticky] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const handleScroll = () => {
    const fromTop = window.scrollY;
    const section = sectionRef.current;

    if (fromTop >= section.offsetTop) {
      setFormSticky(true);
    } else {
      setFormSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleChange = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  useEffect(() => {
    dispatch(getPosts(page));
    setIsFetch(true);
    console.log('getposts')
    // navigate(`/posts?page=${page}`);
  }, [dispatch, page]);

  useEffect(() => {
    setIsLoading(false);
  }, [posts, count]);

  return (
    <>
      <LayoutStyled>
        <div className="container-flued px-3 mt-5">
          <Row className="content">
            <Col className="col-12 col-md-12 col-lg-9">
              {isLoading || posts?.length === 0 ? (
                <Row className="flex-wrap">
                  {[1, 2, 3, 4, 5, 6].map((post, i) => (
                    <PostLoading key={i} />
                  ))}
                </Row>
              ) : (
                <Posts isFetch={isFetch} />
              )}
            </Col>
            {/* search container */}
            <Col
              ref={sectionRef}
              className="form col-12 col-lg-3 d-flex d-lg-block flex-wrap"
            >
              <Col className="col-12">
                <SearchForm page={page} setIsLoading={setIsLoading} />
              </Col>
              <div
                className="col-12 mb-4"
                style={{
                  position: formSticky ? "sticky" : "static",
                  top: "10px",
                }}
              >
                <Col>
                  <Form />
                </Col>
                <Col className="pagination d-none d-lg-flex my-3 py-3 d-flex justify-content-center col-12">
                  <Pagination
                    count={
                      count &&
                      (count % 10 !== 0 ? parseInt(count / 10) + 1 : count / 10)
                    }
                    color="primary"
                    onChange={handleChange}
                  />
                </Col>
              </div>
            </Col>
          </Row>
          <Col className="pagination d-flex d-lg-none my-3 py-3 d-flex justify-content-center col-12">
            <Pagination
              count={
                count &&
                (count % 10 !== 0 ? parseInt(count / 10) + 1 : count / 10)
              }
              color="primary"
              onChange={handleChange}
            />
          </Col>
        </div>
        <Footer />
      </LayoutStyled>
    </>
  );
};
export default Layout;
