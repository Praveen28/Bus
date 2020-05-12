import React, { Component } from "react";
import {
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  ListItem,
  Paper,
  Container,
  Grid
} from "@material-ui/core";
import { PersonOutlineOutlined } from "@material-ui/icons";
import axios from "axios";
import { Icon } from "antd";

class Coordinator extends Component {
  state = {
    faculty: "",
    password: ""
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  handleFaculty = e => {
    this.setState({
      faculty: e.currentTarget.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.currentTarget.value
    });
  };

  resetPassword = e => {
    this.props.history.push("/reset-password");
  };

  addDetails = () => {
    var data = {
      username: this.state.faculty,
      password: this.state.password
    };
    if (!data.username || !data.password) {
      alert("Enter all details");
    } else {
      axios
        .post("http://localhost:8000/bus/user/createUser", data)
        .then(res => {
          if (res.data === "Already user-id exits") {
            alert("Already user-id exits");
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Icon
              style={{ textAlign: "start", fontSize: 25, marginTop: 10 }}
              onClick={this.props.history.goBack}
              type="arrow-left"
            />

            <Typography
              variant="title"
              style={{ fontSize: 25, flexGrow: 1, textAlign: "center" }}
            >
              FACULTY PORTAL
            </Typography>
            <Icon
              style={{ fontSize: 25 }}
              onClick={() => this.props.history.push("/")}
              type="logout"
            />
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Grid>
            <Paper style={{ marginTop: "15%" }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    style={{ flex: 1, textAlign: "center", fontSize: 20 }}
                  >
                    ADD FACULTY
                  </Typography>
                </Toolbar>
              </AppBar>
              <br />
              <div style={{ flexGrow: 1, textAlign: "center" }}>
                <ListItem>
                  <PersonOutlineOutlined
                    variant="outlined"
                    style={{ fontSize: 35, color: "#e53935", marginRight: 7 }}
                  />
                  <TextField
                    label="Enter the faculty id"
                    variant="outlined"
                    value={this.state.coordinator}
                    style={{ width: 400, borderColor: "red" }}
                    onChange={e => this.handleFaculty(e)}
                  />
                </ListItem>
                <br />
                <ListItem>
                  <PersonOutlineOutlined
                    variant="outlined"
                    style={{ fontSize: 35, color: "#e53935", marginRight: 7 }}
                  />
                  <TextField
                    type="password"
                    label="Enter the password"
                    variant="outlined"
                    value={this.state.password}
                    style={{ width: 400, borderColor: "red" }}
                    onChange={e => this.handlePassword(e)}
                  />
                </ListItem>
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: "white" }}
                  onClick={e => {
                    this.addDetails(e);
                  }}
                >
                  Add Faculty
                </Button>{" "}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ color: "white" }}
                  onClick={e => {
                    this.resetPassword(e);
                  }}
                >
                  Reset Password
                </Button>
              </div>
              <br />
            </Paper>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Coordinator;
