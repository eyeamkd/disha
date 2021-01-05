export const isAdmin = (email) => {
  if (email) {
    let domain = email.split("@")[1];
    if (domain === "disha.website") return true;
  } else return false;
};
