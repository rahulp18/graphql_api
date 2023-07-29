import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
dotEnv.config();
const SECRET = process.env.JWT_SECRET;
export const hashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password: " + error.message);
  }
};

export const comparePassword = async (hashedPassword, password) => {
  try {
    const isMatched = await bcrypt.compare(password, hashedPassword);
    return isMatched;
  } catch (error) {
    console.log(error);
    throw new Error("Error comparing passwords: " + error.message);
  }
};
// console.log(SECRET);
export const generateToken = async (userId) => {
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { userId: userId },
        SECRET,
        { expiresIn: "5d" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log("Error generating token:", error.message);
    throw new Error("Error generating token: " + error.message);
  }
};
