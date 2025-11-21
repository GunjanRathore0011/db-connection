import User from "../models/User.js";

export async function getUserContact() {
  try {
    const allContacts = await User.findAll();

    return allContacts;

  } catch (error) {
    throw error.message;
  }
}
