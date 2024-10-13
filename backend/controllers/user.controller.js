import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const userUpdate = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const user = await User.findOne({ id: req.params.id });

    if (req.body.email) {
      if (user.email !== req.body.email) {
        const existEmail = await User.findOne({ email: req.body.email });
        if (existEmail) {
          return next(errorHandler(409, "Email is already exist"));
        }
      }
    }

    if (req.body.id) {
      if (user.id !== req.body.id) {
        const isId = await User.findOne({ id: req.body.id });
        if (isId) {
          return next(errorHandler(409, "Id is already exist"));
        }
      }
    }

    if (user.role === "officer") {
      const userUpdate = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            name: req.body.name,
            password: req.body.password,
            nic: req.body.nic,
            dob: req.body.dob,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            id: req.body.id,
            profilePicture: req.body.profilePicture,
            pStation: req.body.pStation,
          },
        },
        { new: true }
      );
      const { password: pass, ...rest } = userUpdate._doc;
      res.status(200).json(rest);
    } else if (user.role === "driver") {
      const userUpdate = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            name: req.body.name,
            password: req.body.password,
            nic: req.body.nic,
            dob: req.body.dob,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            id: req.body.id,
            profilePicture: req.body.profilePicture,
            vType: req.body.vType,
            model: req.body.model,
          },
        },
        { new: true }
      );
      const { password: pass, ...rest } = userUpdate._doc;
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ id: userId });

    if (user) {
      res.status(200).json(user);
    } else {
      return next(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
};