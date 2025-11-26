import jwt from 'jsonwebtoken';
import Details from "../../models/Details.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function signinUser({name, email,password}) {
  try {

    const userExist=await Details.findOne({where:{email:email}});
    // console.log(userExist);
    if(!userExist){
        throw new Error("User Does not exist..")
    }

    const isMatch=await bcrypt.compare(password,userExist.password);

    if(!isMatch){
        throw new Error("Password does not match..")
    }
    const payload={name, email}
    const token= jwt.sign(payload, process.env.secret_key,
        {expiresIn: '1h'}
    )
    // userExist.token=token;
    
    return token;

  } catch (error) {
    throw error;
  }
}
