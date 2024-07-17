// checking email configuration is correct or not

function ValidEmail(email){
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email)
    
}

// checking Mobile Number configuration is correct or not
const ValidNumber = (number) => {
    const numberRegex= /^\d{10}$/;
    return numberRegex.test(number)
}

export {ValidEmail,ValidNumber}