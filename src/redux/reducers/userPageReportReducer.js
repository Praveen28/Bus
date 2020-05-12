const initialState = {
  loading: false,
  data: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GETREPORT_PENDING":
      return {
        loading: true
      };
    case "FETCH_GETREPORT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };

    case "FETCH_GETREPORT_FAILURE":
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
