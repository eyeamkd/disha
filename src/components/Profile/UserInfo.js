import React, { Component } from "react";
import { Typography, Paper, Icon } from "@material-ui/core";
import { Row, Container, Col } from "react-bootstrap";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import PhoneIcon from "@material-ui/icons/Phone"; 
import DateRangeIcon from '@material-ui/icons/DateRange'; 
import MailIcon from '@material-ui/icons/Mail';
import "./style.css";

export class UserInfo extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="user-sub-heading-spacing">
            <Col>
              <Typography variant="h1" className = "user-name-title-style">Kaustubh Eppalapalli</Typography>
            </Col> 
           </Row> 
           <Row className="user-info">
            <Col>
              <LocationOnIcon />
              <Typography>Hyderbad</Typography>
            </Col>
            <Col>
              <WorkIcon />
              <Typography>Google</Typography>
            </Col>
            <Col>
              <PhoneIcon />
              <Typography>8520959114</Typography>
            </Col> 
            <Col>
              <DateRangeIcon />
              <Typography className="user-sub-heading-spacing" >2020</Typography>
            </Col> 
            <Col>
              <MailIcon />
              <Typography className="user-sub-heading-spacing">kunaldubey2297@gmail.com</Typography>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserInfo;
