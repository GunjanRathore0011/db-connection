import Joi from "joi";

export async function validateUser(user){
    const userSchema= Joi.object({

        name: Joi.string().min(5).max(30).required(),

        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

        address: Joi.string().alphanum().min(3).max(30),
      
        label: Joi.string().valid("Work", "School", "Friends", "Family"),

    })
    // console.log(user)
    const result= await userSchema.validate(user);
    // console.log(result);
    if(result.error) {
        // console.log("error",result)
        return null;
    }
    else return result;
}

export async function validateid({id}){
    // console.log("Validation id",id)

    const idSchema= Joi.object({

        id: Joi.number().integer().required()

    })
    const result= await idSchema.validate({id});
    if(result.error) {
        console.log("error",result)
        return null;
    }
    else return result;
}


export async function validateUpdatedUser(user){
    const userSchema= Joi.object({
        id: Joi.number().integer().required(),

        name: Joi.string().min(5).max(30),

        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),

        address: Joi.string().alphanum().min(3).max(30),
      
        label: Joi.string().valid("Work", "School", "Friends", "Family"),

    })
    // console.log(user)
    const result= await userSchema.validate(user);
    if(result.error) {
        console.log("error",result)
        return null;
    }
    else return result;
}