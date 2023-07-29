import { User } from "../models/User.js";
import {
  comparePassword,
  generateToken,
  hashedPassword,
} from "../utils/helper.js";

export const resolvers = {
  Query: {
    getAllUser: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
    getSingleUser: async (parent, args) => {
      const { id } = args;
      const user = await User.findById(id);
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { name, email, password, phone } = args;
      const encryptedPassword = await hashedPassword(password);
      const newUser = new User({
        name,
        email,
        password: encryptedPassword,
        phone,
      });
      await newUser.save();

      return newUser;
    },
    updateLocation: async (parent, args) => {
      const { id, lat, lng } = args;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { "location.lat": lat, "location.lng": lng } },
        { new: true }
      );
      return updatedUser;
    },
    updateUser: async (parent, args) => {
      try {
        const { id, name, email, phone, password } = args;
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not Found");
        }
        if (name) {
          user.name = name;
        }
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (password) {
          const encryptedPassword = await hashedPassword(password);
          user.password = encryptedPassword;
        }

        const updatedUser = await user.save();
        return updatedUser;
      } catch (error) {
        throw new Error("Some went wrong" + error);
      }
    },
    sendOtp: async (parent, args) => {
      try {
        const { id, phone } = args;
        const user = await User.findById(id);
        if (!user) {
          throw new Error("Id is not provided or wrong");
        }
        const otp = "15354";
        user.otp = otp;
        const otpUser = await user.save();
        console.log(otpUser);
        return "Otp sent Successfuly";
      } catch (error) {
        console.log(error);
        throw new Error("Something Went wrong", error);
      }
    },
    verifyOtp: async (parent, args) => {
      try {
        const { id, otp } = args;
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        if (user.otp !== otp) {
          throw new Error("Invalid Otp");
        }
        user.otp = null;
        user.isVerified = true;
        const updatedUser = await user.save();
        return updatedUser;
      } catch (error) {
        throw new Error("Failed to verify OTP: " + error.message);
      }
    },
    authWithEmailPass: async (parent, args) => {
      try {
        const { email, password } = args;
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("User not Found");
        }
        const isMatched = await comparePassword(user.password, password);
        if (!isMatched) {
          throw new Error("Invalid Password");
        }
        const token = await generateToken(user._id);
        return { token };
      } catch (error) {
        throw new Error("Failed to Login " + error.message);
      }
    },
  },
};
