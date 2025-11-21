import Details from "../models/Details.js";
import { signinUser } from "../services/authServices/signin.js";
import { signupUser } from "../services/authServices/signup.js";
import { validateDetail } from "../validation/validateDetails.js";

export const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkValid = validateDetail({ name, email, password });

    if (!checkValid) {
      return res.status(404).json({
        success: false,
        message: "Entered invalid details.",
      });
    }
    const token=await signinUser({name, email, password});
    req.headers.authorization = token;
    res.cookie("token",token,{
        httpOnly: true,
        maxAge: 3600000 
    })

    return res.status(200).json({
      success: true,
      message: "Sign in successfully",
      token
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error" + error,
    });
  }    
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkValid = await validateDetail({ name, email, password });

    if (!checkValid) {
      return res.status(404).json({
        success: false,
        message: "Entered invalid details.",
      });
    }
    const detail=await signupUser({name, email, password});

    return res.status(200).json({
      success: true,
      message: "Sign up successfully",
      detail
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error" + error,
    });
  }
};
