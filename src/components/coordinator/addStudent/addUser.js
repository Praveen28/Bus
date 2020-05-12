import React, { Component } from "react";
import {
  Typography,
  ListItem,
  TextField,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  Chip,
  Container,
  Paper,
  InputLabel,
  FormControl,
  Grid
} from "@material-ui/core";
import axios from "axios";
import { Icon } from "antd";

class AddUser extends Component {
  state = {
    regnum: "",
    name: "",
    rollnumber: "",
    college: "",
    dept: "",
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

  handleRegNum = e => {
    this.setState({
      regnum: e.currentTarget.value
    });
  };
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
  handleCollege = e => {
    this.setState({
      college: e.target.value
    });
  };

  handleDept = e => {
    this.setState({
      dept: e.target.value
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

  handleFiles = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  submit = e => {
    var data = new FormData();
    data.append("file", this.state.file);
    axios
      .post("http://localhost:8000/bus/add/add-bulk-student", data)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(err));
  };

  addStudent = e => {
    e.preventDefault();

    const data = {
      regnum: this.state.regnum,
      name: this.state.name,
      rollnumber: this.state.rollnumber,
      college: this.state.college,
      dept: this.state.dept,
      year: this.state.year,
      area: this.state.area,
      type: this.state.type,
      status: this.state.status
    };
    if (
      !data.area ||
      !data.dept ||
      !data.name ||
      !data.college ||
      !data.regnum ||
      !data.rollnumber ||
      !data.type ||
      !data.year
    ) {
      alert("Enter all the details in the form");
    } else {
      axios
        .post("http://localhost:8000/bus/add", data)
        .then(res => {
          alert(res.data);
          window.location.reload(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar position="static">
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
        <div>
          <Grid container>
            <Container>
              <Paper style={{ marginTop: "6%" }}>
                <AppBar position="static" variant="elevation">
                  <Toolbar>
                    <Typography style={{ flexGrow: 1, textAlign: "center" }}>
                      ADD STUDENT
                    </Typography>
                  </Toolbar>
                </AppBar>
                <ListItem>
                  <TextField
                    label="Registration Number"
                    variant="outlined"
                    fullWidth
                    value={this.state.regnum}
                    onChange={e => this.handleRegNum(e)}
                    inputProps={{ maxLength: 10 }}
                    style={{ marginTop: 5 }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Name"
                    value={this.state.name}
                    onChange={e => this.handleName(e)}
                    style={{ marginTop: 5 }}
                  />
                  <TextField
                    label="Roll Number"
                    fullWidth
                    variant="outlined"
                    value={this.state.rollnumber}
                    onChange={e => this.handleRollNum(e)}
                    style={{ marginTop: 5, left: 2 }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Area"
                    value={this.state.area}
                    onChange={e => this.handleArea(e)}
                    style={{ marginTop: 5 }}
                  />
                </ListItem>
                <ListItem>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel>Branch</InputLabel>
                    <Select
                      labelWidth={"Branch".length * 8}
                      fullWidth
                      value={this.state.college}
                      onChange={this.handleCollege}
                      defaultValue="KRCE"
                    >
                      <MenuItem value="KRCE">KRCE</MenuItem>
                      <MenuItem value="KRCT">KRCT</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginLeft: 5 }}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      fullWidth
                      value={this.state.dept}
                      onChange={this.handleDept}
                      labelWidth={"Department".length * 8}
                    >
                      <MenuItem value="ECE">ECE</MenuItem>
                      <MenuItem value="EEE">EEE</MenuItem>
                      <MenuItem value="CSE">CSE</MenuItem>
                      <MenuItem value="CIVIL">CIVIL</MenuItem>
                      <MenuItem value="MECH">MECH</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginLeft: 5 }}
                  >
                    <InputLabel>Year</InputLabel>
                    <Select
                      placeholder="year"
                      fullWidth
                      value={this.state.year}
                      onChange={this.handleYear}
                      labelWidth={"Year".length * 8}
                    >
                      <MenuItem value={1}>1st year</MenuItem>
                      <MenuItem value={2}>2nd year</MenuItem>
                      <MenuItem value={3}>3rd year</MenuItem>
                      <MenuItem value={4}>4th year</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginLeft: 5 }}
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      fullWidth
                      value={this.state.type}
                      onChange={this.handleType}
                      labelWidth={"Type".length * 8}
                    >
                      <MenuItem value="Enrolled">Enrolled</MenuItem>
                      <MenuItem value="Not Enrolled">Not Enrolled</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>

                {this.state.type === "Enrolled" ? (
                  <ListItem>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={this.state.status}
                        onChange={this.handleStatus}
                        labelWidth={"Status".length * 8}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                ) : (
                  <Typography></Typography>
                )}
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ color: "white" }}
                  onClick={e => {
                    this.addStudent(e);
                  }}
                >
                  Add Student
                </Button>
                <br />
                <br />
              </Paper>
            </Container>
          </Grid>
        </div>
        <br />
        <br />
        <input type="file" onChange={this.handleFiles}></input>
        <Button onClick={this.submit}>Submit</Button>
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

export default AddUser;
