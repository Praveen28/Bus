import axios from "axios";

export const userPending = () => {
  return {
    type: "FETCH_USER_PENDING"
  };
};

export const userSuccess = user => {
  return {
    type: "FETCH_USER_SUCCESS",
    payload: user
  };
};

export const userFailure = error => {
  return {
    type: "FETCH_USER_FAILURE",
    payload: error
  };
};

export const fetchUser = user => {
  return dispatch => {
    dispatch(userPending());
    axios
      .post("http://localhost:8000/bus/read", user)
      .then(res => {
        const user = res.data;
        setTimeout(() => {
          dispatch(userSuccess(user));
        }, 2000);
      })
      .catch(err => {
        const error = err;
        dispatch(userFailure(error));
      });
  };
};

