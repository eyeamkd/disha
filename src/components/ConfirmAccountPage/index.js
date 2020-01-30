import React, { Component } from "react"; 
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { makeStyles } from "@material-ui/core";

const tableStyles = makeStyles({ 
    CheckIcon:{ 
        color:"green"
    }
})

export class ConfirmAccount extends Component {
  render() {
    return (
      <div>
        <MaterialTable
          title="Account Requests"
          columns={[
            { title: "Name", field: "name" },
            { title: "Surname", field: "surname" },
            { title: "Birth Year", field: "birthYear", type: "numeric" },
            {
              title: "Birth Place",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
            }
          ]}
          data={[
            {
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63
            },
            {
              name: "Zerya Betül",
              surname: "Baran",
              birthYear: 2017,
              birthCity: 34
            }
          ]}
          actions={[
            {
              icon: "check",
              tooltip: "Accept",
              onClick: (event, rowData) => alert("Account Accepted "), 
              color:'primary', 
              iconProps: { style: {  color: "green" } },
            }, 
            {
                icon: "clear",
                tooltip: "Reject",
                onClick: (event, rowData) => alert("Request Rejected "), 
                color:'primary', 
                iconProps: { style: {  color: "red" } },
              }
          ]}
        />
      </div>
    );
  }
}

export default ConfirmAccount;
