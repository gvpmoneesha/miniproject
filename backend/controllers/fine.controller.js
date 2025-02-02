import Fine from "../model/fine.model.js";
import { errorHandler } from "../utils/error.js";
import { sendEmail } from "./email.controller.js";

export const fineIssue = async (req, res, next) => {
  const now = new Date();
  const issueDate = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].slice(0, 5);
  now.setDate(now.getDate() + 14);
  const formattedExpireDate = now.toISOString().split("T")[0];

  const {
    dId,
    dName,
    email,
    vNo,
    place,
    violation,
    pId,
    pName,
    pStation,
    charge,
  } = req.body;

  if (
    !dId ||
    !dName ||
    !email ||
    !vNo ||
    !place ||
    !violation ||
    !pId ||
    !pName ||
    !pStation ||
    !charge ||
    dId == "" ||
    dName == "" ||
    email == "" ||
    vNo == "" ||
    place == "" ||
    violation == "" ||
    pId == "" ||
    pName == "" ||
    pStation == "" ||
    charge == ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const createFine = Fine({
      dId,
      dName,
      email,
      vNo,
      issueDate,
      time,
      place,
      expireDate: formattedExpireDate,
      violation,
      pId,
      pName,
      pStation,
      charge,
      state: false,
    });

    // const bodydd = ` sefjeslij sejfesij fij`
    await createFine.save();
    //await sendEmail(dName, "Reminder: Unpaid Traffic Fine", emailBody);
    res.json("Fine registration is successfull");
  } catch (error) {
    next(error);
  }
};

export const getAllFines = async (req, res, next) => {
  try {
    const fines = await Fine.find();
    if (fines) {
      res.status(200).json(fines);
    } else {
      return next(400, "User not found");
    }
  } catch (error) {
    next(error);
  }
};

export const getFine = async (req, res, next) => {
  try {
    const fineId = req.params.dId;

    const fine = await Fine.find({ dId: fineId });

    if (fine) {
      res.status(200).json(fine);
    } else {
      return next(404, "Fine not found");
    }
  } catch (error) {
    next(error);
  }
};
