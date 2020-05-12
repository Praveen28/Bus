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

class Faculty extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")).status !== "1") {
      alert("Invalid Details...Login again");
      this.props.history.push("/");
    } else {
      axios
        .get("http://localhost:8000/bus/users/get-facultys")
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
      .post("http://localhost:8000/bus/users/delete", data)
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
              ENROLLED CO-ORDINATORS
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
                <TableCell align="center">USER NAME</TableCell>
                <TableCell align="center">PASSWORD</TableCell>
                <TableCell align="center">ROLE</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            {this.state.data.map((item, index) => (
              <TableBody>
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.username}</TableCell>
                  <TableCell align="center">{item.pwd}</TableCell>
                  <TableCell align="center">{item.role}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
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

export default Faculty;
