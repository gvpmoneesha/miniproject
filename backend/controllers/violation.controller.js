import Violation from "../model/violation.model.js";
import { errorHandler } from "../utils/error.js";

export const ruleCreate = async (req, res, next) => {
  const { type, description, price } = req.body;

  if (
    !type ||
    !description ||
    !price ||
    type == "" ||
    description == "" ||
    price == ""
  ) {
    return next(errorHandler(400, "All fiels are required "));
  }

  try {
    const addRule = Violation({
      type,
      description,
      price,
    });
    await addRule.save();
    res.json("Violation rules and informations are added. ");
  } catch (error) {
    next(error);
  }
};

export const getAllRule = async (req, res, next) => {
  try {
    const rules = await Violation.find();
    if (rules) {
      res.status(200).json(rules);
    } else {
      return next(400, "Rules not found.");
    }
  } catch (error) {
    next(error);
  }
};
