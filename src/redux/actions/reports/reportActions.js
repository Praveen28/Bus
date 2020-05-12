import axios from "axios";

export const reportPending = () => {
  return {
    type: "FETCH_REPORT_PENDING"
  };
};

export const reportSuccess = reports => {
  return {
    type: "FETCH_REPORT_SUCCESS",
    payload: reports
  };
};

export const reportFailure = error => {
  return {
    type: "FETCH_REPORT_FAILURE",
    payload: error
  };
};

export const fetchReports = () => {
  return dispath => {
    dispath(reportPending());
    axios
      .get("http://localhost:8000/bus/reports")
      .then(res => {
        const reports = res.data;
        setTimeout(() => {
          dispath(reportSuccess(reports));
        }, 2000);
      })
      .catch(err => {
        const error = err;
        dispath(reportFailure(error));
      });
  };
};

export const fetchReportsByData = values => {
  return dispatch => {
    dispatch(reportPending());
    axios
      .post("http://localhost:8000/bus/reports/findreport", values)
      .then(res => {
        const data = res.data;
        setTimeout(() => {
          dispatch(reportSuccess(data));
        }, 2000);
      })
      .catch(err => {
        const error = err;
        dispatch(reportFailure(error));
      });
  };
};
