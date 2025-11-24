import { validateid, validateUpdatedUser, validateUser } from "../validation/validateUser.js";
import { addUserContact } from "../services/userServices/addUserContact.js";
import { getUserContact } from "../services/userServices/getUserContact.js";
import { deleteUserContact } from "../services/userServices/deleteUserContact.js";
import { updateUserContact } from "../services/userServices/updateUserContact.js";

export const addContact = async (req, res) => {
  try {
    const { name, phone, address, label } = req.body;

    const checkValid= await validateUser({name,phoneNumber: phone, address, label});

    if(!checkValid){
        return res.status(404).json({
            success:false,
            message: "Entered invalid details."
        })
    }
    const result=await addUserContact({name, phone, address, label});

    return res.status(200).json({
      success: true,
      message: "Contact Created Succuessfully.",
      result,
    });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error" + error,
    });
  }
};

export const getContact = async (req, res) => {
  try {

    const allContacts=await getUserContact();
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
    console.log(id)
    const checkValid= await validateid({id});

    if(!checkValid){
        return res.status(404).json({
            success:false,
            message: "Invalid id."
        })
    }    

     await deleteUserContact(id);
    
    return res.status(200).json({
      success: true,
      message: "User deleted successfully..",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone, address, label } = req.body;

    const checkValid= await validateUpdatedUser({name,phoneNumber: phone, address, label, id});

    if(!checkValid){
        return res.status(404).json({
            success:false,
            message: "Entered invalid details."
        })
    }

    const updatedUser = await updateUserContact({name , phone , address, label, id});

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error "+  error,
    });
  }
};
