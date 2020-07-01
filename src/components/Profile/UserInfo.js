import React, { Component } from "react";
import { Typography, Paper, Icon } from "@material-ui/core";
import { Row, Container, Col } from "react-bootstrap";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import PhoneIcon from "@material-ui/icons/Phone";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MailIcon from '@material-ui/icons/Mail';
import "./style.css";

export class UserInfo extends Component {
  render() {
    let rollNumber = this.props.userInfo.rollNumber.toUpperCase();
    return (
      <div>
        <Container>
          <br />
          <Row className="user-info">
            <Col>
              <LocationOnIcon />
              <Typography>{ this.props.userInfo.location ? `${this.props.userInfo.location.name}, ${this.props.userInfo.location.subcountry}` : "Earth"}</Typography>
            </Col>
            <Col>
              <MenuBookIcon />
              <Typography>{this.props.userInfo.department}</Typography>
            </Col>
            <Col>
              <DateRangeIcon />
              <Typography  >{this.props.userInfo.year}</Typography>
            </Col>
            {
              this.props.userInfo.company
                ?
                <Col>
                  <WorkIcon />
                  <Typography>{this.props.userInfo.company}</Typography>
                </Col>
                :
                <Col>
                  <FingerprintIcon />
                  <Typography>{rollNumber}</Typography>
                </Col>
            }

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
