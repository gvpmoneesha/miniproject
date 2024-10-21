import Fine from "../model/fine.model.js";
import { errorHandler } from "../utils/error.js";

export const fineIssue = async (req, res, next) => {
  const {
    dId,
    dName,
    vNo,
    issueDate,
    time,
    place,
    expireDate,
    violation,
    pId,
    pName,
    pStation,
    charge,
    state,
  } = req.body;

  if (
    !dId ||
    !dName ||
    !vNo ||
    !issueDate ||
    !time ||
    !place ||
    !expireDate ||
    !violation ||
    !pId ||
    !pName ||
    !pStation ||
    !charge ||
    !state ||
    dId == "" ||
    vNo == "" ||
    issueDate == "" ||
    time == "" ||
    place == "" ||
    expireDate == "" ||
    violation == "" ||
    pId == "" ||
    pName == "" ||
    pStation == "" ||
    charge == "" ||
    state == ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const createFine = Fine({
      dId,
      dName,
      vNo,
      issueDate,
      time,
      place,
      expireDate,
      violation,
      pId,
      pName,
      pStation,
      charge,
      state,
    });
    await createFine.save();
    res.json("Fine registration is successfull");
  } catch (error) {
    next(error);
  }
};
