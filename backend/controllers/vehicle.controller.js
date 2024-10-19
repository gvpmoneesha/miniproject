import Vehicle from "../model/vehicle.model.js";
import { errorHandler } from "../utils/error.js";

export const vehicleCreate = async (req, res, next) => {
  const { no, cNumber, dob, name, nic, phoneNumber, email, model } = req.body;

  if (
    !no ||
    !cNumber ||
    !dob ||
    !name ||
    !nic ||
    !phoneNumber ||
    !email ||
    !model ||
    no == "" ||
    cNumber == "" ||
    dob == "" ||
    name == "" ||
    nic == "" ||
    phoneNumber == "" ||
    email == "" ||
    model == ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const createVehicle = Vehicle({
      no,
      cNumber,
      dob: new Date(dob),
      name,
      nic,
      phoneNumber,
      email,
      model,
    });
    await createVehicle.save();
    res.json("Vehicle registration is successfull");
  } catch (error) {
    next(error);
  }
};
