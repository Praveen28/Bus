import React, { Component } from "react";
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import axios from "axios";

class Password extends Component {
  state = {
    username: ""
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  username = e => {
    this.setState({
      username: e.currentTarget.value
    });
  };

  resetPassword = () => {
    var data = {
      username: this.state.username
    };
    axios
      .post("http://localhost:8000/bus/user/resetpassword", data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ textAlign: "center", paddingTop: "10%" }}>
        <AppBar style={{ backgroundColor: "green" }}>
          <Toolbar style={{ justifyContent: "center" }}>
            <Typography style={{ fontSize: 20 }}>RESET PASSWORD</Typography>
          </Toolbar>
        </AppBar>
        <TextField
          label="Enter the user-id"
          variant="outlined"
          value={this.state.username}
          onChange={e => this.username(e)}
          style={{ width: 400 }}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          style={{ color: "white", backgroundColor: "green" }}
          onClick={() => this.resetPassword()}
        >
          Reset Password
        </Button>
      </div>
    );
  }
}

export default Password;
