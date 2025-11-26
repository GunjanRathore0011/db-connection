import User from "../../models/User.js";

export async function updateUserContact({ name, phone, address, label ,id}) {
  try {
    const userExist = await User.findByPk(id);
    // console.log(userExist);
    if (!userExist) {
        throw new Error("Contact does not exists.");
    }

    await User.update(
      {
        name: name ? name : userExist.name,
        phoneNumber: phone ? phone : userExist.phoneNumber,
        address: address ? address : userExist.address,
        label: label ? label : userExist.label,
      },
      {
        where: { id: id },
      }
    );
    const updatedUser = await User.findByPk(id);
    return updatedUser;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}
