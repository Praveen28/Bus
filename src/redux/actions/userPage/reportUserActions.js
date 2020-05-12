import axios from "axios";

export const reportPending = () => {
  return {
    type: "REPORT_USER_PENDING"
  };
};

export const reportSuccess = user => {
  return {
    type: "REPORT_USER_SUCCESS",
    payload: user
  };
};

export const reportFailure = error => {
  return {
    type: "REPORT_USER_FAILURE",
    payload: error
  };
};

export const reportUser = userData => {
  return dispatch => {
    dispatch(reportPending());
    axios
      .post("http://localhost:8000/bus/reportstudent", userData)
      .then(res => {
        const user = res.data;
        dispatch(reportSuccess(user));
      })
      .catch(err => {
        const error = err;
        dispatch(reportFailure(error));
      });
  };
};
