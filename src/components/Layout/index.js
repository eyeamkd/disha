import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
//import HomeIcon from "@material-ui/icons/HomeRounded";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Menu from "./../../navigation/menu.json";
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'; 
import Box from '@material-ui/core/Box';


import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {auth} from '../../firebase/firebase.utils';
import { connect } from "react-redux";

import { setUser } from './../../redux/user/user-actions';


const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 
  const menuDisplayHandle=()=>{  
    console.log("Props is ", props); 
    if(props.userInfo!== null)
    return !props.userInfo.isAdmin; 
    else 
    return false;
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    auth.signOut().then(
      changeCurrentUser()
    );
  };

  const changeCurrentUser = () => {
    props.setUser(null)
    // localStorage.clear(); 
    localStorage.removeItem('currentUserId'); 
    localStorage.removeItem('currentUserInfo');
    // console.log(props.user)
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      > 
      {console.log("User info is ", menuDisplayHandle())}
        <Toolbar>
          { menuDisplayHandle() 
            &&
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton> 
          }
          <Box flexGrow={1}>
          <Typography variant="h6" noWrap>
          <Link to="/home">
              DISHA
              </Link>
            </Typography>
          </Box>
          <Box>
            {
              props.currentUser ?
              <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="submit"
              onClick={() => handleSignOut()}
              >
                Sign Out
              </Button>
              :
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="submit"
              >
                <Link to="/SignIn">Sign In</Link>
              </Button>
            }
            
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Menu.map((menuItem, key) => (
            <ListItem
              component={Link}
              to={menuItem.endpoint}
              button
              key={menuItem.routeName}
              onClick={handleDrawerClose}
            >
              <Icon>{menuItem.icon}</Icon>
              <ListItemText
                primary={menuItem.routeName}
                style={{ padding: "10px" }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);