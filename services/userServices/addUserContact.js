import User from "../../models/User.js";

export async function addUserContact({ name, phone, address, label }) {
  try {
    const userExist = await User.findOne({ where: { phoneNumber: phone } });

    if (userExist) {
      throw new Error("Contact already exists.");
    }
    const user = await User.create({
      name,
      phoneNumber: phone,
      address,
      label,
    });

    return user;

  } catch (error) {
    throw error.message;
  }
}
