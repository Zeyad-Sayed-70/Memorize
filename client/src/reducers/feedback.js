export const feedbackReducer = (state = [], action) => {
  switch (action.type) {
    case "POST_FEEDBACK":
      return action.payload;
    default:
      return state;
  }
};
