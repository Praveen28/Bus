const initialState = {
  loading: true,
  report: "",
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPORT_USER_PENDING":
      return {
        loading: true
      };
    case "REPORT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        report: action.payload,
        error: ""
      };
    case "REPORT_USER_FAILURE":
      return {
        ...state,
        loading: false,
        report: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
