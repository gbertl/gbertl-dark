const reducer = (state = false, action) => {
  if (action.type === "TOGGLE_ISNAV") {
    return !state;
  } else if (action.type === "CLOSE_ISNAV") {
    return false;
  }

  return state;
};

export default reducer;
