import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  Select,
  MenuItem,
  Container,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { Spin, Icon } from "antd";
import "antd/dist/antd.css";
import { DeleteRounded } from "@material-ui/icons";
import axios from "axios";
import { connect } from "react-redux";
import {
  fetchReports,
  fetchReportsByData
} from "../../redux/actions/reports/reportActions";

import { CSVLink } from "react-csv";

class report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: "",
      college: "",
      year: ""
    };
  }

  componentDidMount() {
    this.props.fetchReport();
  }

  handleDept = e => {
    this.setState({
      dept: e.target.value
    });
  };

  logout = () => {
    this.props.history.push("/");
    localStorage.clear("user");
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

  getReports = () => {
    var data = {
      dept: this.state.dept,
      college: this.state.college,
      year: this.state.year
    };
    if (!data.dept || !data.college || !data.year) {
      alert("Enter all the fields");
    } else {
      this.props.fetchReportsByData(data);
    }
  };

  delete = e => {
    var data = {
      id: e
    };
    if (window.confirm("Are you sure to delete ")) {
      axios
        .post("http://localhost:8000/bus/reports/reportid", data)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      alert("Report has been deleted");
      window.location.reload(false);
    }
  };

  render() {
    return (
      <div>
        <div style={{ flexGrow: 1 }}>
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
                  color: "white",
                  textAlign: "center"
                }}
              >
                REPORT FILE
              </Typography>
              <Icon
                style={{ fontSize: 25 }}
                onClick={this.logout}
                type="logout"
              />
            </Toolbar>
          </AppBar>
        </div>
        <div></div>
        <Container maxWidth={"sm"}>
          <ListItem>
            <FormControl variant="outlined" style={{ width: "80%" }}>
              <InputLabel>College</InputLabel>
              <Select
                value={this.state.college}
                labelWidth={"College".length * 8}
                onChange={this.handleCollege}
              >
                <MenuItem value="KRCE">KRCE</MenuItem>
                <MenuItem value="KRCT">KRCT</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ width: "80%" }}>
              <InputLabel>Department</InputLabel>
              <Select
                labelWidth={"Department".length * 8}
                variant="outlined"
                value={this.state.dept}
                onChange={this.handleDept}
                style={{ marginLeft: 5 }}
              >
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="EEE">EEE</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="CIVIL">CIVIL</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ width: "80%" }}>
              <InputLabel>Year</InputLabel>

              <Select
                labelWidth={"Year".length * 8}
                variant="outlined"
                value={this.state.year}
                onChange={this.handleYear}
                style={{ marginLeft: 5 }}
              >
                <MenuItem value={1}>1st year</MenuItem>
                <MenuItem value={2}>2nd year</MenuItem>
                <MenuItem value={3}>3rd year</MenuItem>
                <MenuItem value={4}>4th year</MenuItem>
              </Select>
            </FormControl>
            <Button
              color="secondary"
              style={{ marginLeft: 5 }}
              variant="contained"
              onClick={() => this.getReports()}
            >
              REPORT
            </Button>
          </ListItem>
        </Container>
        {this.props.report.loading === true ? (
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              marginTop: "10%"
            }}
          >
            <Spin size="large" />
            <Typography>LOADING...PLEASE WAIT</Typography>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">S.NO</TableCell>
                <TableCell align="center">REGISTER NUMBER</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">COLLEGE</TableCell>
                <TableCell align="center">DEPT</TableCell>
                <TableCell align="center">YEAR</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.report.reports !== undefined ? (
                this.props.report.reports.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.register}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.college}</TableCell>
                      <TableCell align="center">{item.dept}</TableCell>
                      <TableCell align="center">{item.year}</TableCell>
                      <TableCell align="center">
                        {new Date(item.date).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell>
                        <Button onClick={this.delete.bind(this, item._id)}>
                          <DeleteRounded style={{ color: "#e53935" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <h2>No data available</h2>
              )}
            </TableBody>
          </Table>
        )}

        <div style={{ textAlign: "center", paddingTop: "1%" }}>
          {this.props.report.reports !== undefined ? (
            <Button variant="outlined">
              <CSVLink data={this.props.report.reports}>
                Download Report
              </CSVLink>
            </Button>
          ) : (
            <h6> </h6>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    report: state.reports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReport: () => dispatch(fetchReports()),
    fetchReportsByData: data => dispatch(fetchReportsByData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(report);
