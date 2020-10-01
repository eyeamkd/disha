import React, { Component } from "react";
import MaterialTable from "material-table";
import { database } from "../../../firebase/firebase.utils";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./style.css";

export class SetAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {}

  getUsersData() {
    let usersDataArray = [];
    database
      .collection("users")
      .where("isAuthenticated", "==", false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersDataArray.push(doc.data());
        });
        this.setState({ usersData: usersDataArray, dataLoaded: true });
      })
      .catch((err) => {
        console.log("Error in getting not verified users");
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardContent>hello</CardContent>
        </Card>
      </Container>
    );
  }
}

export default SetAdmins;
