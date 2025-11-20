import { Where } from "@sequelize/core";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const addContact = async (req, res) => {
  try {
    const { name, phone, address, label } = req.body;

    // const image = req.file;
    // console.log(image);

    if (!name || !phone || !address || !label) {
      return res.status(404).json({
        success: false,
        message: "All fields are required.",
      });
    }
    if (phone.trim().length != 10)
      return res.status(404).json({
        success: false,
        message: "Enter correct phone number.",
      });

    const userExist = await User.findOne({ where: { phoneNumber: phone } });

    if (userExist) {
      return res.status(404).json({
        success: false,
        message: "Contact already exists.",
      });
    }
    // cloudinary.uploader
    //   .upload(image.originalname)
    //   .then((result) => console.log(result));

    const user = await User.create({
      name,
      phoneNumber: phone,
      address,
      label,
    });

    return res.status(200).json({
      success: true,
      message: "Contact Created Succuessfully.",
      user,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const allContacts = await User.findAll();

    return res.status(200).json({
      success: true,
      message: "Fetched all contacts",
      allContacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findByPk(id);

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "Contact does not exits.",
      });
    }

    await userExist.destroy();
    return res.status(200).json({
      success: true,
      message: "User deleted successfully..",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone, address, label } = req.body;

    const userExist = await User.findByPk(id);

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "Contact does not exits.",
      });
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
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
