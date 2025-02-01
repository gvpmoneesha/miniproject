import Fine from "../model/fine.model.js";
import { errorHandler } from "../utils/error.js";

export const fineIssue = async (req, res, next) => {
  const now = new Date();
  const issueDate = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].slice(0, 5);
  now.setDate(now.getDate() + 14);
  const formattedExpireDate = now.toISOString().split("T")[0];

  const { dId, dName, vNo, place, violation, pId, pName, pStation, charge } =
    req.body;

  if (
    !dId ||
    !dName ||
    !vNo ||
    !place ||
    !violation ||
    !pId ||
    !pName ||
    !pStation ||
    !charge ||
    dId == "" ||
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
    await createFine.save();
    res.json("Fine registration is successfull");
  } catch (error) {
    next(error);
  }
};
