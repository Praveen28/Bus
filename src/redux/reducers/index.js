import { combineReducers } from "redux";
import ReportReducer from "../reducers/reportReducer";
import UserPageReducer from "../reducers/userPageReducer";
import ReportUserReducer from "./reportUserReducer";
import GetReportReducer from "./userPageReportReducer";

const rootReducer = combineReducers({
  reports: ReportReducer,
  userPage: UserPageReducer,
  reportUser: ReportUserReducer,
  getReport: GetReportReducer
});

export default rootReducer;
