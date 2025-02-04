import Complain from "../model/complain.model.js";
import { errorHandler } from "../utils/error.js";

export const complainCreate = async (req, res, next) => {
  const { name, phoneNumber, email, complain, image } = req.body;

  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const date = offsetDate.toISOString().split("T")[0];

  if (
    !name ||
    !phoneNumber ||
    !email ||
    !complain ||
    name == "" ||
    phoneNumber == "" ||
    email == "" ||
    complain == ""
  ) {
    return next(errorHandler(400, "All fields are required."));
  }

  try {
    const createComplain = Complain({
      name,
      phoneNumber,
      email,
      complain,
      date,
      image,
    });
    await createComplain.save();
    res.json("Complain submitted.");
  } catch (error) {
    next(error);
  }
};
