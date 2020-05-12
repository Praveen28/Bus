import React, { Component } from "react";
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  ListItem,
  Paper,
  Container
} from "@material-ui/core";
import { Card, Icon, message } from "antd";

class Admin extends Component {
  state = {
    admin: "",
    log: ""
  };

  logout = () => {
    localStorage.clear("user");
    this.props.history.push("/");
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div onClick={message.success("Login Successfull")}></div>
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
              BUS MANAGMENT SYSTEM
            </Typography>
            <Icon
              style={{ fontSize: 25 }}
              onClick={this.logout}
              type="logout"
            />
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Paper style={{ marginTop: "10%" }} elevation={10}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  style={{ flexGrow: 1, textAlign: "center", fontSize: 25 }}
                >
                  ADMIN PAGE
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <ListItem>
                <Card
                  title="FACULTY PORTAL"
                  style={{ width: 300 }}
                  cover={
                    <img
                      style={{ height: 150 }}
                      alt="example"
                      src="https://pngimage.net/wp-content/uploads/2018/05/faculty-png-1.png"
                    />
                  }
                >
                  <div style={{ textAlign: "center", flexGrow: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => this.props.history.push("/addfaculty")}
                    >
                      REGISTER
                    </Button>{" "}
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.props.history.push("/enrolled-faculty")
                      }
                      style={{ marginRight: 3 }}
                    >
                      ENROLLED
                    </Button>
                  </div>
                </Card>

                <Card
                  title="CO-ORDINATOR PORTAL"
                  style={{ width: 300, marginLeft: 30 }}
                  cover={
                    <img
                      style={{ height: 150 }}
                      alt="example"
                      src="https://static.thenounproject.com/png/729345-200.png"
                    />
                  }
                >
                  <div style={{ textAlign: "center", flexGrow: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.props.history.push("/addco-ordinator")
                      }
                    >
                      REGISTER
                    </Button>{" "}
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.props.history.push("/enrolled-coordinator")
                      }
                      style={{ marginRight: 3 }}
                    >
                      ENROLLED
                    </Button>
                  </div>
                </Card>

                <Card
                  title="REPORTS"
                  style={{ width: 300, marginLeft: 30 }}
                  cover={
                    <img
                      style={{ height: 150 }}
                      alt="example"
                      src="https://www.skedler.com/wp-content/uploads/2019/05/illustration-reports.png"
                    />
                  }
                >
                  <div style={{ textAlign: "center", flexGrow: 1 }}>
                    <Button
                      style={{}}
                      onClick={() => this.props.history.push("/report")}
                      variant="outlined"
                    >
                      VIEW REPORTS
                    </Button>
                  </div>
                </Card>
              </ListItem>
            </div>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <ListItem style={{ flexGrow: 1, justifyContent: "center" }}>
                <Card
                  title="STUDENT PORTAL"
                  style={{ width: 270 }}
                  cover={
                    <img
                      style={{ height: 150 }}
                      alt="example"
                      src="https://www.skedler.com/wp-content/uploads/2019/05/illustration-reports.png"
                    />
                  }
                >
                  <div style={{ textAlign: "center", flexGrow: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => this.props.history.push("/students-list")}
                    >
                      ENROLLED
                    </Button>
                  </div>
                </Card>
              </ListItem>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Admin;
