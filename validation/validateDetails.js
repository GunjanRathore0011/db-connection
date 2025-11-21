import Joi from "joi"

export async function validateDetail(detail) {
    
    const detailSchema=Joi.object({
        name: Joi.string().min(3).max(20).required(),

        email: Joi.string().email().required().min(5).max(30),

        password: Joi.string().required().min(8).max(15),
    })
    const result= await detailSchema.validate(detail);
    if(result.error) {
        console.log("error",result)
        return null;
    }
    else return result;
}