import React, { Component } from "react";
import { TextField, Grid, Typography, Paper } from "@material-ui/core";
import { message, Button } from "antd";
import { Card } from "antd";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    oncontextmenu = function(e) {
      e.preventDefault();
    };
  }

  username = e => {
    this.setState({
      username: e.currentTarget.value
    });
  };

  password = e => {
    this.setState({
      password: e.currentTarget.value
    });
  };

  login = e => {
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    localStorage.setItem("user", JSON.stringify(this.state.username));

    if (!data.username || !data.password) {
      message.info("Enter the details");
    } else {
      axios.post("http://localhost:8000/bus/user/login", data).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        if (res.data[0].status === "1") {
          this.props.history.push("/admin");
        } else if (res.data[0].status === "2") {
          this.props.history.push("/coordinator");
        } else if (res.data[0].status === "3") {
          this.props.history.push("/userpage");
        } else {
          alert("Enter correct credentials");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={7}>
            <div
              style={{
                height: "100vh",
                backgroundImage:
                  "url(" +
                  "http://tlc.krgi.in/ictlabkrct4/newversion/images/back.svg" +
                  ")"
              }}
            ></div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <Typography style={{ textAlign: "center" }}>
                KR GROUP OF INSTITUTIONS
              </Typography>
              <br />
              <Paper
                variant="elevation"
                elevation={15}
                style={{ width: "60%", marginLeft: "20%" }}
              >
                <Card
                  title="BUS MANAGEMENT SYSTEM"
                  headStyle={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#722ed1"
                  }}
                >
                  <div>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="standard"
                      value={this.state.username}
                      onChange={e => this.username(e)}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      variant="standard"
                      value={this.state.password}
                      onChange={e => this.password(e)}
                    />
                  </div>
                  <br />
                  <br />
                  <div>
                    <Button
                      block
                      variant="outlined"
                      style={{ color: "white", backgroundColor: "#eb2f96" }}
                      onClick={e =>
                        this.login({
                          username: this.state.username,
                          password: this.state.password
                        })
                      }
                    >
                      Login
                    </Button>
                  </div>
                </Card>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
