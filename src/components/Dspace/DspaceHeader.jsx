import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DspacePosts from './DspacePosts'
import DspaceMemberList from './DspaceMemberList'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
    }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function DspaceHeader(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // console.log(props.dSpace.members)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
        
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
                <Tab label="Member List" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            <DspacePosts dSpace={props.dSpace}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.dSpace.description}
            </TabPanel>
            <TabPanel value={value} index={2}>
                    <DspaceMemberList dSpaceId={props.dSpace.id}/>
            </TabPanel>
        </div>
            
    );
}