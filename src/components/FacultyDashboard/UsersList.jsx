import { Container, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'; 


export default function UsersList(props ){ 
    const [users, setusers] = useState([]); 

    useEffect(() => {
        getUsers();
    }, [props.users]); 

    const getUsers = () =>{
        setusers(props.users); 
        console.log(users);
    }
    return( 
        <Container>
            <MaterialTable  
            title=""
                columns={
                    [
                        {title:"First Name", field:"firstName"},
                        {title:"Last Name", field:"lastName"},
                        {title:"Passed Out Year",field:"year"},  
            { title: "Roll Number", field: "rollNumber" },
                        {title:"email",field:"email"},
                    ]
                } 

                data = {users}
            />
        </Container>
    )
}