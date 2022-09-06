export const accountReducer = (user = {}, action) => {
  switch (action.type) {
    case "SIGN_UP":
      if (!(action.payload.message === "this account has been exist"))
        localStorage.setItem("profile", JSON.stringify(action.payload));
      return action.payload;
    case "SIGN_IN":
      if (!(action.payload.message === "this account is not exist!"))
        localStorage.setItem("profile", JSON.stringify(action.payload));
      return action.payload;
    case "UPDATE_ACCOUNT":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return action.payload;
    default:
      return user;
  }
};
