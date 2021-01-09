export const getInitials=(firstName,lastName)=>{
    // console.log("State from profile",this.state);
    return (
    firstName[0].toUpperCase() +
    lastName[0].toUpperCase()
    );
  } 

  export const getImageStoragePath= (folderName,refName,fileName) => {  
      //folder to be initially determined on context 
      // name of the file to be stored, should be as <ref-name>-<fileName> 
      let path = `${folderName}/${refName}-${fileName}`; 
      return path;

  }
export const isAdmin = (email) => {
  if (email) {
    let domain = email.split("@")[1];
    if (domain === "disha.website") return true;
  } else return false;
};
