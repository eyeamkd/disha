import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/Context";
import { database } from "../../firebase/firebase.utils";
import { PieChart, Pie, Sector } from "recharts";
import BatchWisePieChart from "./BatchWisePieChart";
import UsersList from "./UsersList";

const useStyles = makeStyles({
  totalCountSection: {
    display: "flex",
    justifyContent: "center",
  }, 
  subHeadingStyle:{
    padding: "20px 0px 20px 0px",   
    fontWeight:200
  },
  usersCountStyle:{
    fontWeight:200, 
    paddingLeft:'30px',
    color:'#f57f17',
    fontSize:'50px'

  }
});

const FacultyDashboard = (props) => {
  const [totalDepartmentUsersCount, setTotalDepartmentUsersCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [
    numberOfUsersJoinedThisMonth,
    setNumberOfUsersJoinedThisMonth,
  ] = useState(0);
  const [
    numberOfUsersJoinedThisWeek,
    setNumberOfUsersJoinedThisWeek,
  ] = useState(0);
  const [
    totalNumberOfExpectedUsersFromDepartment,
    settotalNumberOfExpectedUsersFromDepartment,
  ] = useState(0);
  const [usersOfDepartment, setUsersOfDepartment] = useState([]);
  const [department, setdepartment] = useState("");
  const [batchWiseUsers, setBatchWiseUsers] = useState({});
  const classes = useStyles();

  let dept = useContext(UserContext).facultyData.department;
  useEffect(() => {
    getAllUsers(dept);
  }, [dept]);
  useEffect(() => {
    getBatchWiseStats();
  }, [usersOfDepartment]);
  useEffect(() => {
    getUsersJoinedThisWeek();
  }, [batchWiseUsers]);
  const getUsersJoinedThisMonth = () => {};
  const getUsersJoinedThisWeek = () => {
    console.log("Batch Wise Users", batchWiseUsers);
  };
  const getBatchWiseStats = () => {
    let batchWiseObject = {};
    usersOfDepartment.forEach((user) => {
      batchWiseObject[user.year] = !!batchWiseObject[user.year]
        ? [...batchWiseObject[user.year], user]
        : [user];
    });
    setBatchWiseUsers(batchWiseObject);
  };
  const getAllUsers = async (department) => {
    const usersRef = database.collection("users");
    const snapshot = await usersRef.where("department", "==", department).get();
    if (!snapshot.empty) {
      setTotalDepartmentUsersCount(snapshot.size);
      snapshot.forEach((doc) => {
        setUsersOfDepartment((usersOfDepartment) => [
          ...usersOfDepartment,
          doc.data(),
        ]);
      });
      // getBatchWiseStats();
    }
  };

  return (
    <UserContext.Consumer>
      {(value) => (
        <React.Fragment>
          <Typography variant="h1" style={{paddingBottom:'30px'}}>
            Department of {value.facultyData.department}
          </Typography>
          <React.Fragment>
            <Typography variant="h4" className={classes.subHeadingStyle}>
              Total Users Count:  
              <span className={classes.usersCountStyle} >{totalDepartmentUsersCount}</span>
            </Typography>
          </React.Fragment>
        
          <React.Fragment>
            <Typography variant="h4" className={classes.subHeadingStyle}>Batch Wise Statistics</Typography>
            <div className={classes.totalCountSection}>
              <BatchWisePieChart data={batchWiseUsers} />
            </div>
          </React.Fragment>

          <React.Fragment className="users-list-section">
            <Typography variant="h5" className={classes.subHeadingStyle}>List of Users</Typography>
            <UsersList users={usersOfDepartment} />
          </React.Fragment>
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
};

export default FacultyDashboard;
