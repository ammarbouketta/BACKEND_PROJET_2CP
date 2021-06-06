const Joi = require('@hapi/joi')


//user Sign up validation

const ValidateSP = body => {
    
    const UserValidation = Joi.object({
        Full_Name : Joi.string().min(5).required().alphanum() ,
        Email : Joi.string().min(5).required().email() ,
        Password : Joi.string().min(4).required(),
        Username : Joi.string().min(5).required().alphanum(),
        Phone : Joi.string().min(5).required(),
    })
    const {error} = UserValidation.validate(body)
    const msg = (error) ? error.details[0].message : null
    return {error,msg}
}

//login validation
const ValidateLI = body => {
    
    const UserValidation = Joi.object({
        Password : Joi.string().min(4).required(),
        Username : Joi.string().min(5).required().alphanum(),
    })
    const {error} = UserValidation.validate(body)
    const msg = (error) ? error.details[0].message : null
    return {error,msg}
}

//list validation
const ValidateLIST = body => {
    
    const UserValidation = Joi.object({
        Title : Joi.string().required().alphanum(),
    })
    const {error} = UserValidation.validate(body)
    const msg = (error) ? error.details[0].message : null
    return {error,msg}
}

//Item validaation
const ValidateITM = body => {
    
    const UserValidation = Joi.object({
        Title : Joi.string().min(1).required().alphanum(),
        Description : Joi.string(),
        Deadline : Joi.date()
    })
    const {error} = UserValidation.validate(body)
    const msg = (error) ? error.details[0].message : null
    return {error,msg}
}





module.exports = {ValidateSP,ValidateLI,ValidateLIST,ValidateITM}