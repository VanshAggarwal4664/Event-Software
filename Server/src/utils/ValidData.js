function ValidEmail(email){
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email)
    
}
const ValidNumber = (number) => {
    const numberRegex= /^\d{10}$/;
    return numberRegex.test(number)
}

export {ValidEmail,ValidNumber}