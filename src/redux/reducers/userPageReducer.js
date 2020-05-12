const initialState = {
  loading: false,
  user: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_PENDING":
      return {
        loading: true
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: ""
      };

    case "FETCH_USER_FAILURE":
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
