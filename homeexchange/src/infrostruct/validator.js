export const validator = {
  password: (value)=>{
    let isValid = true;
    let message = "";
    
    return {
      isValid,
      message
    }
  },
  email: (value)=>{
    let isValid = true;
    let message = "";
     
    return {
      isValid,
      message
    }
  },
}