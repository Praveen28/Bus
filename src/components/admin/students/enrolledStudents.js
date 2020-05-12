import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { Icon } from "antd";
import { DeleteRounded } from "@material-ui/icons";
import axios from "axios";

class Coordinator extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    } else {
      axios
        .get("http://localhost:8000/bus/read/get-students")
        .then(res => {
          console.log(res.data);
          this.setState({
            data: res.data
          });
        })
        .catch(err => console.log(err));
    }
  }

  delete = e => {
    var data = {
      id: e
    };
    axios
      .post("http://localhost:8000/bus/read/delete", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    window.location.reload(false);
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
              STUDENTS LIST
            </Typography>
            <Icon
              style={{ fontSize: 25 }}
              onClick={() => this.props.history.push("/")}
              type="logout"
            />
          </Toolbar>
        </AppBar>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">S.NO</TableCell>
                <TableCell align="center">REGISTER</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">ROLL NUMBER</TableCell>
                <TableCell align="center">DEARTMENT</TableCell>
                <TableCell align="center">YEAR</TableCell>
                <TableCell align="center">COLLEGE</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            {this.state.data.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.register}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.rollnumber}</TableCell>
                  <TableCell align="center">{item.dept}</TableCell>
                  <TableCell align="center">{item.year}</TableCell>
                  <TableCell align="center">{item.college}</TableCell>
                  <TableCell>
                    <Button onClick={this.delete.bind(this, item._id)}>
                      <DeleteRounded style={{ color: "#e53935" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    );
  }
}

export default Coordinator;
