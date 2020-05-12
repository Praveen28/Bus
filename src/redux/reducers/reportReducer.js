const initialState = {
  loading: false,
  reports: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REPORT_PENDING":
      return {
        loading: true
      };
    case "FETCH_REPORT_SUCCESS":
      return {
        ...state,
        loading: false,
        reports: action.payload,
        error: ""
      };
    case "FETCH_REPORT_FAILURE":
      return {
        ...state,
        loading: false,
        reports: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
