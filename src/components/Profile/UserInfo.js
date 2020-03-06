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
          <br/>
          <Row className="user-info">
            <Col>
              <LocationOnIcon />
              <Typography>Hyderabad</Typography>
            </Col>
            <Col>
              <WorkIcon />
              <Typography>Technovert</Typography>
            </Col>
            <Col>
              <PhoneIcon />
              <Typography>8520959114</Typography>
            </Col> 
            <Col>
              <DateRangeIcon />
              <Typography  >{this.props.userInfo.year}</Typography>
            </Col> 
            <Col>
              <MailIcon />
              <Typography >{this.props.userInfo.email}</Typography>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserInfo;
