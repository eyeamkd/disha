import {MAILING_MICROSERVICE} from '../shared/constants';
const axios = require("axios");
const qs = require("qs"); 

const sendMail = (toMailAddress, subject = "Mail from Disha", content) => {
  var data = qs.stringify({
    toAddress: toMailAddress,
    subject: subject,
    content: content,
  });
  var config = {
    method: "post",
    url: MAILING_MICROSERVICE,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

export default sendMail;
