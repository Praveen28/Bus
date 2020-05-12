import React, { Component } from "react";
import {
  Typography,
  ListItem,
  TextField,
  Select,
  MenuItem,
  Button,
  Fab,
  AppBar,
  Toolbar,
  Chip,
  Grid,
  Container,
  Paper,
  FormControl,
  InputLabel
} from "@material-ui/core";

import { Edit } from "@material-ui/icons";
import axios from "axios";
import { Icon } from "antd";
class UpdateUser extends Component {
  state = {
    regNumber: "",
    name: "",
    rollnumber: "",
    dept: "",
    college: "",
    year: "",
    area: "",
    type: "",
    status: "",
    file: "",
    data: []
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "2") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    }
  }

  handleName = e => {
    this.setState({
      name: e.currentTarget.value
    });
  };

  handleRollNum = e => {
    this.setState({
      rollnumber: e.currentTarget.value
    });
  };

  handleDept = e => {
    this.setState({
      dept: e.target.value
    });
  };

  handleCollege = e => {
    this.setState({
      college: e.target.value
    });
  };

  handleYear = e => {
    this.setState({
      year: e.target.value
    });
  };

  handleArea = e => {
    this.setState({
      area: e.currentTarget.value
    });
  };

  regNumber = e => {
    this.setState({
      regNumber: e.currentTarget.value
    });
  };

  handleType = e => {
    this.setState({
      type: e.target.value
    });
  };

  handleStatus = e => {
    this.setState({
      status: e.target.value
    });
  };

  edit = e => {
    e.preventDefault();
    var data = { regnum: this.state.regNumber };
    axios
      .post("http://localhost:8000/bus/read", data)
      .then(res => {
        if (res.data !== "No user found") {
          this.setState({
            name: res.data[0].name,
            rollnumber: res.data[0].rollnumber,
            dept: res.data[0].dept,
            college: res.data[0].college,
            year: res.data[0].year,
            area: res.data[0].area,
            type: res.data[0].type,
            status: res.data[0].status
          });
        } else {
          alert(res.data);
          window.location.reload(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleFiles = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  submit = () => {
    var data = new FormData();
    data.append("file", this.state.file);
    console.log(data);

    axios
      .post("http://localhost:8000/bus/update/update-bulk", data)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(err));
  };

  updateStudent = e => {
    e.preventDefault();
    var details = {
      regnum: this.state.regNumber,
      name: this.state.name,
      rollnumber: this.state.rollnumber,
      college: this.state.college,
      dept: this.state.dept,
      year: this.state.year,
      area: this.state.area,
      type: this.state.type
    };
    if (
      !this.state.name ||
      !this.state.rollnumber ||
      !this.state.college ||
      !this.state.dept ||
      !this.state.year ||
      !this.state.area ||
      !this.state.type
    ) {
      alert("Check whether all the fields are entered");
    } else {
      axios
        .post("http://localhost:8000/bus/update", details)
        .then(res => {
          alert(res.data);
          window.location.reload(false);
        })
        .catch(err => console.log(err));
    }
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
              variant="title"
              style={{ fontSize: 25, flexGrow: 1, textAlign: "center" }}
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
        <div></div>
        <Grid container style={{ marginTop: 20 }}>
          <Container>
            <Paper elevation={3}>
              <AppBar position="static">
                <Toolbar>
                  <Typography style={{ flexGrow: 1, textAlign: "center" }}>
                    UPDATE STUDENT
                  </Typography>
                </Toolbar>
              </AppBar>
              <ListItem>
                <TextField
                  fullWidth
                  label="Enter the registration number"
                  variant="outlined"
                  value={this.state.regNum}
                  onChange={e => this.regNumber(e)}
                />
                <Fab
                  onClick={e => this.edit(e)}
                  style={{
                    marginLeft: 20,
                    color: "white",
                    backgroundColor: "green"
                  }}
                >
                  <Edit />
                </Fab>
              </ListItem>

              <ListItem>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  value={this.state.name}
                  onChange={e => this.handleName(e)}
                />
                <TextField
                  fullWidth
                  label="Roll Number"
                  variant="outlined"
                  value={this.state.rollnumber}
                  onChange={e => this.handleRollNum(e)}
                  style={{ marginLeft: 3 }}
                />
              </ListItem>
              <ListItem>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>College</InputLabel>
                  <Select
                    labelWidth={"College".length * 8}
                    fullWidth
                    value={this.state.college}
                    onChange={this.handleCollege}
                  >
                    <MenuItem value="KRCE">KRCE</MenuItem>
                    <MenuItem value="KRCT">KRCT</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={this.state.dept}
                    onChange={this.handleDept}
                    labelWidth={"Department".length * 8}
                    style={{ marginLeft: 2 }}
                  >
                    <MenuItem value="ECE">ECE</MenuItem>
                    <MenuItem value="EEE">EEE</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="CIVIL">CIVIL</MenuItem>
                    <MenuItem value="MECH">MECH</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={this.state.year}
                    labelWidth={"Year".length * 8}
                    onChange={this.handleYear}
                    style={{ marginLeft: 2 }}
                  >
                    <MenuItem value={1}>1st year</MenuItem>
                    <MenuItem value={2}>2nd year</MenuItem>
                    <MenuItem value={3}>3rd year</MenuItem>
                    <MenuItem value={4}>4th year</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <TextField
                  label="Area"
                  variant="outlined"
                  value={this.state.area}
                  onChange={e => this.handleArea(e)}
                  fullWidth
                />
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    fullWidth
                    labelWidth={"Type".length * 8}
                    value={this.state.type}
                    onChange={this.handleType}
                    style={{ marginLeft: 3 }}
                  >
                    <MenuItem value="Enrolled">Enrolled</MenuItem>
                    <MenuItem value="Not Enrolled">Not Enrolled</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>

              {this.state.type === "Enrolled" ? (
                <Grid container xs={12}>
                  <ListItem>
                    <Grid item xs={8} spacing={10}>
                      <FormControl variant="outlined" style={{ width: "100%" }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          labelWidth={"Status".length * 8}
                          value={this.state.status}
                          onChange={this.handleStatus}
                        >
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        style={{ color: "white", marginLeft: 3 }}
                        onClick={e => {
                          this.updateStudent(e);
                        }}
                      >
                        update Student
                      </Button>
                    </Grid>
                  </ListItem>
                </Grid>
              ) : (
                <Grid container xs={12}>
                  <ListItem>
                  <Grid item xs={8}></Grid>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        style={{ color: "white", marginLeft: 3 }}
                        onClick={e => {
                          this.updateStudent(e);
                        }}
                      >
                        update Student
                      </Button>
                    </Grid>
                  </ListItem>
                </Grid>
              )}
              <br />
              {/* <Button
                color="secondary"
                variant="contained"
                style={{ color: "white" }}
                onClick={e => {
                  this.updateStudent(e);
                }}
              >
                update Student
              </Button> */}
              <br />
              <br />
            </Paper>
          </Container>
        </Grid>
        <br />
        <ListItem style={{ paddingLeft: "17%" }}></ListItem>
        <input type="file" onChange={this.handleFiles}></input>
        <Button onClick={() => this.submit()}>Submit</Button>
        <br />
        <br />
        {this.state.data !== undefined ? (
          this.state.data.map((item, index) => (
            <div>
              <Chip
                style={
                  item.status === 0 ? { color: "red" } : { color: "green" }
                }
                label={item.result}
              />
              <br />
              <br />
            </div>
          ))
        ) : (
          <h3> </h3>
        )}
      </div>
    );
  }
}

export default UpdateUser;
