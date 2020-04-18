import React, { Component } from 'react';
import { Card, CardContent, Typography, Box, makeStyles, Avatar } from '@material-ui/core';  

import { deepOrange, deepPurple } from '@material-ui/core/colors';

const Styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        },
        orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        },
        purple: {
        color: '#ffffff',
        backgroundColor: '#F9A825',
        },
    }));  

const getInitials=(fullName)=>{ 
        const words =  fullName.split(" "); 
        if(words.length>1)
            return (words[0][0]+" "+words[1][0]); 
        else 
            return (words[0][0]);
} 

export default function UserCard(props) {   
        const classes = Styles();
        // console.log(getInitials(props.title))
        return (   
                <Box  
                boxShadow={2}
                borderColor="primary"
                borderRadius={16}
                style={{ 
                    margin: '0.5rem',
                }}
                >  
                <Card  
                    variant="outlined"
                    style={{ 
                        width: '18rem',
                        minHeight: '5rem',
                    }}
                    className="grow"
                    >  
                        <CardContent style={{display:'flex', justifyContent:'space-around'}} >   
                            <Avatar className={classes.purple}>{getInitials(props.title)}</Avatar>
                            <Typography>{props.title}</Typography>
                        </CardContent>
                    </Card>
                </Box>
        )
    } 


