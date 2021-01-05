export const FILTER_TYPES = {
  BATCH: "My Batch",
  DEPARTMENT: "My Department",
  SECTION: "My Section",
};

export const POST_SCORES = {
  ADMIN: 4,
  INTERNSHIP_PROJECT: 4,
  SUBSCRIBED_DSPACE: 2,
  YEAR_BRANCH: 2,
  NOT_LIKED: 1,
  OTHER: 0,
};

export const POST_CATEGORIES = {
  PROJECT: "Project",
  INTERNSHIP: "Internship",
  EVENTS: "Events",
  OTHER: "Other",
  NONE: "None",
};

export const ROLL_NUMBER_CONFIG = {
  YEAR: ["0", "1", "2"],
  STUDENT_TYPE: ["1a", "5a"],
  BRANCH: ["00", "01", "02", "03", "04", "05", "12"],
};

export const DEPARTMENT_CODES = {
  "01": "Civil",
  "02": "EEE",
  "03": "Mech",
  "04": "ECE",
  12: "IT",
  "05": "CSE",
};

export const PASSWORD_STRENGTHS = {
  0: "Anyone can guess that!",
  1: "Hackable!",
  2: "Now that's a bit better",
  3: "Almost there!",
  4: "Perfect!",
};

export const POST_SCORE_THRESHOLD = 2;

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

export const MAILING_MICROSERVICE = 'https://disha-mailer.azurewebsites.net/send-mail'; 

export const facultyAdminMailContentCreator = (name,link,department) => {
  let subject = 'Congratulations! You are now a Faculty Admin'; 
    let body = `Hello ${name} \n  
    Hearty congratulations on being appointed as the DISHA Faculty Admin for the ${department} Department \n 
    \n
    Please go on to this link ${link} in order to set your password and get started `;  

    return Object.assign({},{subject:subject,body:body}); 

}
