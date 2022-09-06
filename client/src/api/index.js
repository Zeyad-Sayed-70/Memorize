import axios from "axios";

const post_url = "https://memories1977.herokuapp.com/posts";
// const post_url = "http://localhost:5000/posts";

export const FetchPosts = (page) => axios.get(`${post_url}?page=${page}`);

export const getPost = (postId) => axios.get(`${post_url}/${postId}`);

export const getPostsBySearch = (searchData, page) =>
  axios.get(
    `${post_url}/search?searchQuery=${searchData.search || "none"}&tags=${
      searchData.tags.join(",") || []
    }&page=${page || 1}`
  );

export const createPost = (post) => axios.post(post_url, post);

export const deletePost = (postId) => axios.delete(`${post_url}/${postId}`);

export const updatePost = (postId, editedPost) =>
  axios.patch(`${post_url}/${postId}`, editedPost);

export const updatePosts = (post, id) => axios.patch(post_url, { id, post });

export const commentPost = (postId, comment) =>
  axios.patch(`${post_url}/${postId}/comment`, { data: comment });

const account_url = "https://memories1977.herokuapp.com/accounts";
// const account_url = "http://localhost:5000/accounts";

export const post_signup = (account) =>
  axios.post(`${account_url}/signup`, account);
export const post_signin = (account) =>
  axios.post(`${account_url}/signin`, account);
export const updateAccount = (account, id) =>
  axios.patch(`${account_url}/${id}`, account);

const feedback_url = "https://memories1977.herokuapp.com/feedback";
// const feedback_url = "http://localhost:5000/feedback";

export const postFeedBack = (feedback) => axios.post(feedback_url, feedback);
