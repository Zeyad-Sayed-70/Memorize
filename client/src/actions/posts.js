import * as api from "../api/index";

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.FetchPosts(page);
    console.log(data)
    dispatch({ type: "GET_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.getPost(postId);

    dispatch({ type: "GET_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchData, page) => async (dispatch) => {
  try {
    const { data } = await api.getPostsBySearch(searchData, page);

    dispatch({ type: "GET_POSTS_BY_SEARCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "ADD_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(postId);
    dispatch({ type: "DELETE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (postId, editedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postId, editedPost);

    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts = (post, id) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(post, id);
    dispatch({ type: "UPDATE_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(postId, comment);
    dispatch({ type: "COMMENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
