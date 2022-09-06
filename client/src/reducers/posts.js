export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count,
      };
    case "GET_POST":
      return { post: action.payload };
    case "GET_POSTS_BY_SEARCH":
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count,
      };
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
            return post;
          } else return post;
        }),
      };
    case "UPDATE_POSTS":
      return state.posts;
    case "COMMENT":
      return {
        ...state,
        posts: state.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
    default:
      return { ...state, posts: state };
  }
};
