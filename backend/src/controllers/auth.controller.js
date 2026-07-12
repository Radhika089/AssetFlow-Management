import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = async (userId) => {
  return await jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "Email is in already use",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const token = await createToken(user._id);
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "Registered Successfully!",
      user: { _id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await createToken(user._id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login Successfully!",
      user: { _id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
}
