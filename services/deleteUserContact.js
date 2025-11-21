import User from "../models/User.js";

export async function deleteUserContact(id) {
  try {
    const userExist = await User.findByPk(id);

    if (!userExist) {
      throw new Error("Contact does not exists.");
    }
    const result= await userExist.destroy();
    return result;
  } catch (error) {
    console.log("error,message" + error.message)
    throw error.message;
  }
}
