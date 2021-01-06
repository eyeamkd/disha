export const getInitials=(firstName,lastName)=>{
    // console.log("State from profile",this.state);
    return (
    firstName[0].toUpperCase() +
    lastName[0].toUpperCase()
    );
  }