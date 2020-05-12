import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import Login from "./components/login/login";
import Admin from "./components/admin/admin";
import Coordinator from "./components/coordinator/coordinator";
import AddUser from "./components/coordinator/addStudent/addUser";
import UpdateStudent from "./components/coordinator/updateStudent/updateUser";
import UserPage from "./components/user/userPage";
import ReportPage from "./components/report/report";
import AddCoordinator from "./components/admin/addCoordinator/addCoordinator";
import ResetPassword from "./components/admin/resetPassword/resetPassword";
import AddFaculty from "./components/admin/addFaculty/addFaculty";
import EnrolledCoordinator from "./components/admin/addCoordinator/enrolledCoordinator";
import EnrolledFaculty from "./components/admin/addFaculty/enrolledFaculty";
import StudentsList from "./components/admin/students/enrolledStudents";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/coordinator" exact component={Coordinator}></Route>
          <Route path="/reset-password" exact component={ResetPassword}></Route>
          <Route path="/addfaculty" exact component={AddFaculty}></Route>
          <Route path="/addco-ordinator" exact component={AddCoordinator}></Route>
          <Route path="/adduser" exact component={AddUser}></Route>
          <Route path="/updateuser" exact component={UpdateStudent}></Route>
          <Route path="/userpage" exact component={UserPage}></Route>
          <Route path="/report" exact component={ReportPage}></Route>
          <Route path="/enrolled-coordinator" exact component={EnrolledCoordinator}></Route>
          <Route path="/enrolled-faculty" exact component={EnrolledFaculty}></Route>
          <Route path="/students-list" exact component={StudentsList}></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
