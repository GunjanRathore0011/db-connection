import Details from "../../models/Details.js";
import bcrypt from "bcrypt";

export async function signupUser({name, email,password}) {
  try {
    const userExist= await Details.findOne({where:{email:email}});
    // console.log(userExist)
    if(userExist){
        throw new Error("User Already exists..");
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    const detail = await Details.create({
      name,
      email,
      password: hashedPassword,
    });
    return detail;
  } catch (error) {
    throw error;
  }
}
