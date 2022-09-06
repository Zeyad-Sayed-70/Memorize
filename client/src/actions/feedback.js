import * as api from "../api/index";

export const postFeedBack = (feedback) => async (dispatch) => {
  try {
    const { data } = await api.postFeedBack(feedback);
    // dispatch({ type: "POST_FEEDBACK", payload: data });
  } catch (error) {
    console.log(error);
  }
};
