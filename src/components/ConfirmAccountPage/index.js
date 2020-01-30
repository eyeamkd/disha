import React, { Component } from "react"; 
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { makeStyles } from "@material-ui/core"; 

import usersData from '../../data/users.json';

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
            { title: "Name", field: "firstName" },
            { title: "Batch", field: "batch" },
            { title: "Roll Number", field: "rollNumber"}, 
            { title: "Phone Number", field: "phoneNumber"}, 
            { title: "Email", field: "email"},
          ]}
          data={usersData.filter( user => !user.verified)}
          actions={[
            {
              icon: "check",
              tooltip: "Accept",
              onClick: (event, rowData) => {  
                const uid = rowData.uId  
                usersData.forEach(user => { 
                  if( user.uId === uid ){ 
                    user.verified = true
                  }
                });
                }, 
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
