import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Container from "@material-ui/core/Container";
import Logo from "../../Logo/Logo";
import { database } from "../../../firebase/firebase.utils";
import { Formik } from "formik";
import { PASSWORD_STRENGTHS, EMAIL_REGEX } from "../../../shared/constants";
import zxcvbn from "zxcvbn";

import {
  FormControl,
  OutlinedInput,
  InputLabel,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";

import { Redirect } from "react-router-dom";

import {
  ROLL_NUMBER_CONFIG,
  DEPARTMENT_CODES,
} from "../../../shared/constants";

import "./SignUp.css";
import {
  auth,
  createUserProfileDocument,
} from "../../../firebase/firebase.utils";

var emailRegex = EMAIL_REGEX;
let mbaCode = "1e";
class SignUp extends React.Component {
  state = {
    isAckChecked: false,
    isAlumni: false,
    isAuthenticated: false,
    accountCreated: false,
    department: "",
    section: "a",
    password: "",
    passwordMessage: "",
    signupErrorMessage: "",
    rollNumberError: false,
    emailExistsError: false,
    ackMessage: "",
    confirmPassword: "",
    labelWidth: 0,
    inputLabel: null,
    errors: null, 
    confirmPasswordDisabled:true
  };  

  constructor(props){
    super(props);
  }

  handleFirstNameChange = (value) => {
    if (value.length < 1) return "* Required";
  };

  handleLastNameChange = (value) => {
    if (value.length < 1) return "* Required";
  };

  handleEmailChange = (value) => {
    console.log(process.env.NODE_ENV);
    let isEmailProper = emailRegex.test(value);
    if (value.length < 1 || !isEmailProper) {
      if (value.length < 1) {
        return "* Required";
      } else if (!isEmailProper) {
        return "* Enter a valid email address";
      }
    }
    let domain = value.split("@")[1].toLowerCase();
    if (domain === "disha.website") {
      return "* This domain is blocked against user sign up. Kindly use a different email address.";
    }
  };

  handleRollNumberChange = (value) => {
    let tempRollNumber = value.toLowerCase().split(" ")[0];
    let isRollNumberProper = this.validateRollNumber(tempRollNumber);
    if (tempRollNumber.length < 1 || !isRollNumberProper) {
      if (tempRollNumber.length < 1) {
        return "* Required";
      } else if (!isRollNumberProper) {
        return "* Invalid Roll Number";
      }
    }
  };

  setDepartmentWithRollNumber = (value) => {
    let department;
    let departments = DEPARTMENT_CODES;
    if (value.length > 7) {
      let deptCode = value.substring(6, 8);
      let studentType = value.substring(4, 6);
      if (studentType === mbaCode) {
        this.setState({ department: "MBA" });
        department = "MBA";
        return department;
      }
      department = departments[deptCode];
      this.setState({ department: departments[deptCode] });
    } else {
      this.setState({ department: "" });
    }
    return department;
  };

  handleYearChange = (value) => {
    let yearValue = Number(value);
    let yearMax = new Date().getFullYear() + 5;
    let isYearProper = Number(value) > 2007 && Number(value) <= yearMax;
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let errMsg;
    if (value.length < 1) {
      errMsg = "* Required";
    } else if (!isYearProper) {
      errMsg = "* Invalid Year";
    }
    if (value.length > 3) {
      if (yearValue < currentYear) {
        this.setState({ isAlumni: true });
      } else if (yearValue === currentYear && currentMonth > 6) {
        this.setState({ isAlumni: true });
      } else {
        this.setState({ isAlumni: false });
      }
    }
    return errMsg;
  };

  handlePasswordChange = (value) => {
    if (value.length < 1) {
      this.setState({ passwordMessage: "",  confirmPasswordDisabled:true});
      return "* Required";
    }
    if (value.length < 9) { 
      this.setState({ 
        confirmPasswordDisabled:true
      })
      return "* Too Short!";
    }
    let pwdAnalysis = zxcvbn(value); //Gives the password strength score
    this.setState({
      password: value,
      passwordMessage: PASSWORD_STRENGTHS[pwdAnalysis.score], 
      confirmPasswordDisabled:false
    });
  };

  handleConfirmPasswordChange = (value) => {
    if (value !== this.state.password) {
      return "* Passwords do not match";
    }
  };

  handleAckChange = () => {
    if (this.state.isAckChecked) {
      this.setState({
        ackMessage: "* Please confirm if the details are correct",
      });
    }
    this.state.isAckChecked = !this.state.isAckChecked;
    this.setState({ isAckChecked: this.state.isAckChecked });
  };

  beautifyName = (str) => {
    //A Function to return name in capitalized case
    while (str[str.length - 1] === " ") str = str.slice(0, str.length - 1);
    while (str[0] === " ") str = str.slice(1, str.length);
    let strParts = str.split(" ");
    for (let i = 0; i < strParts.length; i++) {
      strParts[i] =
        strParts[i].charAt(0).toUpperCase() +
        strParts[i].slice(1).toLowerCase();
    }
    return strParts.join(" ");
  };

  rollNumberExists = async (rollNumber) => {
    if (!rollNumber) return false;
    let usersRef = database.collection("users");
    let query = await usersRef
      .where("rollNumber", "==", rollNumber)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    return query;
  };

  emailExists = async (email) => {
    if (!email) return false;
    let usersRef = database.collection("users");
    let query = await usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    console.log("email query", query);
    return query;
  };

  isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  validateRollNumber(rollNumber) {
    rollNumber = rollNumber.toLowerCase();
    var year = ROLL_NUMBER_CONFIG.YEAR;
    var studentType = ROLL_NUMBER_CONFIG.STUDENT_TYPE;
    var branch = ROLL_NUMBER_CONFIG.BRANCH;

    if (rollNumber.length !== 10) {
      return false;
    }
    if (year.indexOf(rollNumber.substring(0, 1)) === -1) {
      return false;
    }
    if (rollNumber.substring(2, 4) !== "p6") {
      return false;
    }
    if (studentType.indexOf(rollNumber.substring(4, 6)) === -1) {
      return false;
    }
    if (branch.indexOf(rollNumber.substring(6, 8)) === -1) {
      return false;
    } else {
      if (
        rollNumber.substring(6, 8) === "00" &&
        rollNumber.substring(4, 6) !== mbaCode
      )
        return false;
    }
    return true;
  }

  isOptionDisabled = (value) => {
    switch (value) {
      case "a":
        return false;
      case "b":
        return this.state.department === "IT";
      case "c":
      case "d":
        return (
          this.state.department === "IT" ||
          this.state.department === "Civil" ||
          this.state.department === "EEE" ||
          this.state.department === "Mech" ||
          this.state.department === "MBA"
        );
    }
  };

  resetErrorFlags() {
    if (this.state.emailExistsError) this.setState({ emailExistsError: false });
    if (this.state.rollNumberError) this.setState({ rollNumberError: false });
  }

  handleSignupClick = async (values, setSubmitting) => {
    if (!this.state.isAckChecked) {
      this.setState({
        ackMessage: "* Please confirm if the details are correct",
      });
      setSubmitting(false);
      return;
    }
    if (!this.isObjectEmpty(this.state.errors)) {
      setSubmitting(false);
      return;
    }

    if (await this.emailExists(values.email)) {
      this.setState({ emailExistsError: true });
      setSubmitting(false);
      return;
    } else {
      this.setState({ emailExistsError: false });
    }
    if (await this.rollNumberExists(values.rollNumber)) {
      this.setState({ rollNumberError: true });
      setSubmitting(false);
      return;
    } else {
      this.setState({ rollNumberError: false });
    }

    try {
      const information = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      let firstName = this.beautifyName(values.firstName);
      let lastName = this.beautifyName(values.lastName);
      var likedPosts = [];
      var dspaces = [];
      var rollNumber = values.rollNumber.toLowerCase();
      let { email, year, department, section } = values;
      let newEmail = email.toLowerCase();
      let { isAlumni, isAuthenticated } = this.state;
      debugger;
      const { user } = information;  
      const userDoc = {
        firstName,
        lastName,
        newEmail,
        rollNumber,
        year,
        department,
        section,
        isAlumni,
        isAuthenticated,
        likedPosts,
        dspaces,
      };
      userDoc.id = user.uid
      await this.props.updateUser(userDoc);
       createUserProfileDocument(user, userDoc).then(()=>this.setState({ accountCreated: true }));
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Logo height="196" width="150" />
          <br />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              rollNumber: "",
              year: "",
              department: "Department",
              section: "a",
              acknowledged: false,
              
            }}
            validate={(values) => {
              const errors = {};
              let temp;
              this.resetErrorFlags();
              temp = this.handleFirstNameChange(values.firstName);
              if (temp) errors.firstName = temp;
              temp = this.handleLastNameChange(values.lastName);
              if (temp) errors.lastName = temp;
              temp = this.handleEmailChange(values.email);
              if (temp) errors.email = temp;
              temp = this.handleRollNumberChange(values.rollNumber);
              if (temp) errors.rollNumber = temp;
              temp = this.handleYearChange(values.year);
              if (temp) errors.year = temp;
              temp = this.handlePasswordChange(values.password);
              if (temp) errors.password = temp;
              temp = this.handleConfirmPasswordChange(values.confirmPassword);
              if (temp) errors.confirmPassword = temp;
              let department = this.setDepartmentWithRollNumber(
                values.rollNumber
              );
              if (department) values.department = department;
              if (values.department === "IT") values.section = "a";
              this.setState({ errors: errors });
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.handleSignupClick(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        First Name
                      </InputLabel>
                      <OutlinedInput
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        labelWidth={60}
                        required={true}
                        fullWidth
                      />
                      {touched.firstName && (
                        <FormHelperText error={true}>
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        labelWidth={60}
                        required={true}
                        fullWidth
                      />
                      {touched.lastName && (
                        <FormHelperText error={true}>
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Email Address
                      </InputLabel>
                      <OutlinedInput
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        labelWidth={60}
                        required={true}
                        fullWidth
                      />
                      {touched.email && (
                        <FormHelperText error={true}>
                          {errors.email}
                        </FormHelperText>
                      )}
                      {this.state.emailExistsError && (
                        <FormHelperText error={true}>
                          * This email already exists. Contact the admin in case
                          of any problem.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Roll Number
                      </InputLabel>
                      <OutlinedInput
                        id="rollNumber"
                        type="text"
                        name="rollNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rollNumber}
                        labelWidth={60}
                        error={this.state.rollNumberError}
                        required={true}
                        fullWidth
                      />
                      {touched.rollNumber && (
                        <FormHelperText error={true}>
                          {errors.rollNumber}
                        </FormHelperText>
                      )}
                      {this.state.rollNumberError && (
                        <FormHelperText error={true}>
                          * This Roll Number already exists. Contact the admin
                          in case of any problem.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Pass-out Year
                      </InputLabel>
                      <OutlinedInput
                        id="year"
                        type="number"
                        name="year"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                        labelWidth={60}
                        required={true}
                        fullWidth
                      />
                      {touched.year && (
                        <FormHelperText error={true}>
                          {errors.year}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Department
                      </InputLabel>
                      <OutlinedInput
                        id="department"
                        type="text"
                        name="department"
                        disabled
                        labelWidth={60}
                        value={this.state.department}
                        required={true}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend">Section</FormLabel>
                    <RadioGroup
                      aria-label="section"
                      id="section"
                      name="section"
                      value={values.section}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      row
                    >
                      <FormControlLabel
                        value="a"
                        control={<Radio color="primary" />}
                        label="A"
                        labelPlacement="end"
                        disabled={this.isOptionDisabled("a")}
                      />
                      <FormControlLabel
                        value="b"
                        control={<Radio color="primary" />}
                        label="B"
                        labelPlacement="end"
                        disabled={this.isOptionDisabled("b")}
                      />
                      <FormControlLabel
                        value="c"
                        control={<Radio color="primary" />}
                        label="C"
                        labelPlacement="end"
                        disabled={this.isOptionDisabled("c")}
                      />
                      <FormControlLabel
                        value="d"
                        control={<Radio color="primary" />}
                        label="D"
                        labelPlacement="end"
                        disabled={this.isOptionDisabled("d")}
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        labelWidth={60}
                        required={true}
                        fullWidth
                      />
                      {touched.password && (
                        <FormHelperText error={true}>
                          {errors.password}
                        </FormHelperText>
                      )}
                      {
                        <FormHelperText error={false}>
                          {this.state.passwordMessage}
                        </FormHelperText>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel variant="outlined" className="input-label">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        labelWidth={60}
                        required={true}
                        fullWidth 
                        disabled={this.state.confirmPasswordDisabled}
                      />
                      {touched.confirmPassword && (
                        <FormHelperText error={true}>
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={values.acknowledged}
                          color="primary"
                          onChange={this.handleAckChange}
                        />
                      }
                      label="I agree that aforementioned details are correct."
                    />
                    {
                      <FormHelperText error={true}>
                        {this.state.isAckChecked ? "" : this.state.ackMessage}
                      </FormHelperText>
                    }
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </form>
            )}
          </Formik>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {this.state.accountCreated ? <Redirect to="/home" /> : null}
        </div>
      </Container>
    );
  }
}

export default SignUp;
