import axios from "axios";

export const getReportPending = () => {
  return {
    type: "FETCH_GETREPORT_PENDING"
  };
};

export const getReportSuccess = report => {
  return {
    type: "FETCH_GETREPORT_SUCCESS",
    payload: report
  };
};

export const getReportFailure = error => {
  return {
    type: "FETCH_GETREPORT_FAILURE",
    payload: error
  };
};

export const getReport = data => {
  return dispatch => {
    dispatch(getReportPending());
    axios
      .post("http://localhost:8000/bus/reports/getReport", data)
      .then(res => {
        const report = res.data;
        dispatch(getReportSuccess(report));
      })
      .catch(err => dispatch(getReportFailure(err)));
  };
};
