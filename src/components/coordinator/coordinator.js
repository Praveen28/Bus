import React, { Component } from "react";
import {
  Typography,
  Fab,
  Button,
  AppBar,
  Toolbar,
  Tooltip,
  Container,
  ListItem
} from "@material-ui/core";
import { Add, Edit, Report, ExitToApp } from "@material-ui/icons/";
import { Icon } from "antd";

class Admin extends Component {
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "2") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  add = e => {
    this.props.history.push("/adduser");
  };

  update = e => {
    this.props.history.push("/updateuser");
  };

  logout = () => {
    this.props.history.push("/");
  };

  report = () => {
    this.props.history.push("/report");
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar style={{ backgroundColor: "green" }} position="static">
          <Toolbar>
            <Icon
              style={{ textAlign: "start", fontSize: 25, marginTop: 10 }}
              onClick={this.props.history.goBack}
              type="arrow-left"
            />

            <Typography
              variant="h3"
              style={{
                fontSize: 25,
                flexGrow: 1,
                textAlign: "center",
                color: "white"
              }}
            >
              CO-ORDINATOR
            </Typography>
            <Icon
              style={{ fontSize: 25 }}
              onClick={() => this.props.history.push("/")}
              type="logout"
            />
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: "10%" }}>
          <Container maxWidth="sm">
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => this.add()}
                style={{ backgroundColor: "white" }}
              >
                <Tooltip title="Add Student" placement="top">
                  <Fab
                    style={{
                      height: 70,
                      width: 70,
                      backgroundColor: "green",
                      color: "white"
                    }}
                  >
                    <Add />
                  </Fab>
                </Tooltip>
              </Button>
            </div>
            <br />
            <br />
            <ListItem>
              <Tooltip title="Update Student" placement="left">
                <Button
                  onClick={() => this.update()}
                  style={{ backgroundColor: "white" }}
                >
                  <Fab
                    style={{
                      height: 70,
                      width: 70,
                      backgroundColor: "green",
                      color: "white"
                    }}
                  >
                    <Edit />
                  </Fab>
                </Button>
              </Tooltip>

              <Tooltip title="Reports" placement="right">
                <Button
                  onClick={() => this.report()}
                  style={{ backgroundColor: "white", paddingLeft: "67%" }}
                >
                  <Fab
                    style={{
                      height: 70,
                      width: 70,
                      backgroundColor: "green",
                      color: "white"
                    }}
                  >
                    <Report />
                  </Fab>
                </Button>
              </Tooltip>
            </ListItem>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              <Tooltip title="Logout" placement="top">
                <Button
                  style={{ backgroundColor: "white" }}
                  onClick={() => this.logout()}
                >
                  <Fab
                    style={{
                      height: 70,
                      width: 70,
                      backgroundColor: "green",
                      color: "white"
                    }}
                  >
                    <ExitToApp />
                  </Fab>
                </Button>
              </Tooltip>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Admin;
