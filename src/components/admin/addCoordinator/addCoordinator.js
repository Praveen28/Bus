import React, { Component } from "react";
import {
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  ListItem
} from "@material-ui/core";
import {Icon} from "antd"
import { PersonOutlineOutlined } from "@material-ui/icons";
import axios from "axios";

class Coordinator extends Component {
  state = {
    coordinator: "",
    password: ""
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  handleCoordinator = e => {
    this.setState({
      coordinator: e.currentTarget.value
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
      user_name: this.state.coordinator,
      password: this.state.password
    };
    if (!data.user_name || !data.password) {
      alert("Enter all details");
    } else {
      axios
        .post("http://localhost:8000/bus/user/createCoordinator", data)
        .then(res => {
          if (res.data === "Already field exits") {
            alert("Already field exits");
          } else {
            alert("Co-ordinator has been added");
            window.location.reload(false);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
          <AppBar style={{ backgroundColor: "green" }} position="static">
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
                ADD CO-ORDINATOR
              </Typography>
              <Icon
                style={{ fontSize: 25 }}
                onClick={() => this.props.history.push("/")}
                type="logout"
              />
            </Toolbar>
          </AppBar>

        <div style={{ paddingTop: "15%", textAlign: "center" }}></div>
        <ListItem style={{ paddingLeft: "35%" }}>
          <PersonOutlineOutlined
            variant="outlined"
            style={{ fontSize: 35, color: "#e53935", marginRight: 7 }}
          />
          <TextField
            label="Enter the co-ordinator id"
            variant="outlined"
            value={this.state.coordinator}
            style={{ width: 400, borderColor: "red" }}
            onChange={e => this.handleCoordinator(e)}
          />
        </ListItem>
        <br />
        <ListItem style={{ paddingLeft: "35%" }}>
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
        <div style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => {
              this.addDetails();
            }}
          >
            Add Co-ordinator
          </Button>{" "}
          <Button
            variant="outlined"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={e => {
              this.resetPassword(e);
            }}
          >
            Reset Password
          </Button>
        </div>
      </div>
    );
  }
}

export default Coordinator;
