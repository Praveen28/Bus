import React, { Component } from "react";
import {
  TextField,
  ListItem,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Paper,
  Container,
  Button,
  Chip
} from "@material-ui/core";
import { Spin, Icon } from "antd";
import "antd/dist/antd.css";
import { ReportRounded } from "@material-ui/icons";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/userPage/userActions";
import { reportUser } from "../../redux/actions/userPage/reportUserActions";
import { getReport } from "../../redux/actions/reports/getReport";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regnum: ""
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "3") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  changeReg = e => {
    this.setState({
      regnum: e.currentTarget.value
    });
  };

  keyPress = e => {
    var data = {
      regnum: this.state.regnum
    };
    if (e.keyCode === 13) {
      this.props.getUserDetails(data);
      this.props.getReport(data);
    }
  };

  report = () => {
    var data = {
      details: this.props.userDetails.user
    };

    if (
      window.confirm(
        "Are you sure to report " + this.props.userDetails.user[0].name
      )
    ) {
      this.props.reportUser(data);
      alert(this.props.userDetails.user[0].name + " has been reported");
    }
  };
  render() {
    return (
      <div style={{ textAlign: "center", flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: "green" }} position="static">
          <Toolbar>
            <Icon
              style={{ textAlign: "start", fontSize: 25, marginTop: 10 }}
              onClick={this.props.history.goBack}
              type="arrow-left"
            />

            <Typography
              variant="body1"
              style={{ fontSize: 25, flexGrow: 1, textAlign: "center" }}
            >
              STUDENT INFORMATION
            </Typography>
            <Icon
              style={{ fontSize: 25 }}
              onClick={() => this.props.history.push("/")}
              type="logout"
            />
          </Toolbar>
        </AppBar>

        <div>
          <Container maxWidth="sm">
            <Paper style={{ marginTop: 10 }} variant="elevation">
              <ListItem style={{ paddingLeft: "7.4%" }}>
                <TextField
                  variant="outlined"
                  label="Register Number"
                  value={this.state.renum}
                  onChange={e => this.changeReg(e)}
                  fullWidth
                  onKeyDown={this.keyPress}
                />
              </ListItem>
              <div style={{ flexGrow: 1 }}></div>
              {this.props.userDetails.loading === true ? (
                <div>
                  <Spin size="large" />
                  <Typography>
                    Please wait untill data is being fetched from the database
                  </Typography>
                </div>
              ) : this.props.userDetails.user.length > 0 ? (
                this.props.userDetails.user !== "No user found" ? (
                  this.props.userDetails.user.map((item, index) => (
                    <div>
                      <Avatar
                        style={{ height: 80, width: 80, left: "40%" }}
                        alt="Cindy Baker"
                        src="https://cdn3.iconfinder.com/data/icons/jobs-6/120/man-1-512.png"
                      />
                      <ListItem>
                        <TextField
                          variant="outlined"
                          label="Name"
                          fullWidth
                          value={item.name}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      <ListItem>
                        <TextField
                          fullWidth
                          label="Roll Number"
                          variant="outlined"
                          value={item.rollnumber}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      <ListItem>
                        <TextField
                          fullWidth
                          label="College"
                          variant="outlined"
                          value={item.college}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      <ListItem>
                        <TextField
                          fullWidth
                          label="Department"
                          variant="outlined"
                          value={item.dept}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      <ListItem>
                        <TextField
                          label="Year"
                          fullWidth
                          variant="outlined"
                          value={item.year}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      <ListItem>
                        <TextField
                          label="Area"
                          fullWidth
                          variant="outlined"
                          value={item.area}
                          style={{}}
                        />
                      </ListItem>
                      <br />
                      {item.type === "Not Enrolled" ? (
                        <div>
                          <TextField
                            value={item.type}
                            style={{ width: "95%" }}
                            variant="outlined"
                            label="Type"
                          />
                          <br />
                          <Button
                            style={{
                              backgroundColor: "#5C6BC0",
                              marginTop: 10
                            }}
                            onClick={() => this.report()}
                          >
                            Report
                            <ReportRounded style={{ color: "#ff1744" }} />
                          </Button>
                        </div>
                      ) : (
                        <ListItem>
                          <TextField
                            value={item.type}
                            fullWidth
                            variant="outlined"
                            label="Type"
                          />
                        </ListItem>
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <Typography>No user found </Typography>
                  </div>
                )
              ) : (
                <h3> </h3>
              )}
              <br />
              {this.props.userDetails.loading === true ? (
                <h3> </h3>
              ) : this.props.getReportDetails.data !== undefined ? (
                this.props.getReportDetails.data.map((item, index) => (
                  <Chip
                    label={item.name + " has already been reported"}
                    style={{ backgroundColor: "red", color: "white" }}
                  />
                ))
              ) : (
                <h3>{this.props.userDetails.user}</h3>
              )}
              <br />
            </Paper>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.userPage,
    reportUser: state.reportUser,
    getReportDetails: state.getReport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: user => dispatch(fetchUser(user)),
    reportUser: user => dispatch(reportUser(user)),
    getReport: user => dispatch(getReport(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
