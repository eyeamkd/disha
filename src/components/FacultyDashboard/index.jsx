import { Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState  } from 'react'
import { UserContext } from '../../utils/Context';
import {database} from '../../firebase/firebase.utils';


const FacultyDashboard = (props) => {  
    const [totalDepartmentUsersCount, setTotalDepartmentUsersCount] = useState(0); 
    const [totalUsersCount, setTotalUsersCount] = useState(0); 
    const [numberOfUsersJoinedThisMonth, setNumberOfUsersJoinedThisMonth] = useState(0); 
    const [numberOfUsersJoinedThisWeek, setNumberOfUsersJoinedThisWeek] = useState(0);
    const [totalNumberOfExpectedUsersFromDepartment, settotalNumberOfExpectedUsersFromDepartment] = useState(0);
    const [usersOfDepartment, setUsersOfDepartment] = useState([]);  
    const [department, setdepartment] = useState(''); 
    const [batchWiseUsers, setBatchWiseUsers] = useState({});

    let dept = useContext(UserContext).facultyData.department;
    useEffect(() => {
        getAllUsers(dept);
    }, [dept]) 
    useEffect(()=>{
        getBatchWiseStats();
    },[usersOfDepartment]) 
    useEffect(()=>{
        getUsersJoinedThisWeek();
    },[batchWiseUsers])
    const getUsersJoinedThisMonth=()=>{ 

    }
    const getUsersJoinedThisWeek=()=>{
        console.log("Batch Wise Users",batchWiseUsers);
    }
    const getBatchWiseStats=()=>{   
        let batchWiseObject = {};
            usersOfDepartment.forEach(user=>{
                batchWiseObject[user.year] = !!batchWiseObject[user.year]?[...batchWiseObject[user.year],user]:[user];
            }) 
            setBatchWiseUsers(batchWiseObject);
    } 
    const getAllUsers=async (department)=>{ 
        const usersRef = database.collection('users'); 
        const snapshot = await usersRef.where('department','==',department).get();  
        if(!snapshot.empty){
            setTotalDepartmentUsersCount(snapshot.size);   
            snapshot.forEach(doc =>{ 
                setUsersOfDepartment(usersOfDepartment=>[...usersOfDepartment,doc.data()]);
            }); 
            // getBatchWiseStats(); 
          
        }
    }  

    

    return (
        <UserContext.Consumer>
            { 
                (value)=>(  
                    <React.Fragment> 
                    <Typography variant="h1">  
                     Dashboard of {value.facultyData.department} Department
                    </Typography>  
                    
                    </React.Fragment>
                )      
            }
        </UserContext.Consumer>
 )
} 

export default FacultyDashboard;
