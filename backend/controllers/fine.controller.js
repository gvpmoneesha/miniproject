import Fine from "../model/fine.model.js";
import { errorHandler } from "../utils/error.js";
import { sendEmail } from "./email.controller.js";

export const fineIssue = async (req, res, next) => {
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const issueDate = offsetDate.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].slice(0, 5);
  //now.setDate(now.getDate() + 14);
  //const formattedExpireDate = now.toISOString().split("T")[0];
  const yesterdayDate = new Date(offsetDate);
  yesterdayDate.setDate(yesterdayDate.getDate() + 14);
  const formattedExpireDate = yesterdayDate.toISOString().split("T")[0];

  const {
    _id,
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

  console.log(_id);
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

    const savedFine = await createFine.save();

    const emailBodyFine = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: #d32f2f;
        color: #ffffff;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .content p {
        font-size: 16px;
      }
      .details {
        background: #ffebee;
        padding: 15px;
        border-radius: 5px;
        margin: 10px 0;
      }
      .details p {
        margin: 5px 0;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #777777;
        margin-top: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        color: #ffffff;
        background: #d32f2f;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .button:hover {
        background: #b71c1c;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2 style="color: white;">🚨 Traffic Fine Notice. <br /> Driver Id-: ${dId} 🚨</h2>
      </div>
      <div class="content">
        <p>Dear <strong>${dName}</strong>,</p>
        <p><strong>You have been issued a traffic fine for the following violation:
          
        </strong></p>
        
        <div class="details">
          <p><strong>Violation:</strong> ${violation}</p>
          <p><strong>Charge:</strong> ${charge}</p>
          <p><strong>Issue Date:</strong> ${issueDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Location:</strong> ${place}</p>
          
          <p><strong>Expiry Date:</strong> ${formattedExpireDate}</p>
          <p><strong>Vehicle No:</strong> ${vNo}</p>
          <p><strong>Police Officer Id:</strong> ${pId}</p>
          <p><strong>Police Officer name:</strong> ${pName}</p>
          <p><strong>Police Officer Station:</strong> ${pStation}</p><br>
          <p><strong>Your Payment Id:</strong> <span style="color: blue; font-weight: bold;">${savedFine._id}</span></p>

        </div>
        
        <p>Please pay your fine before the due date to avoid further penalties.</p>
        
        <p style="text-align: center;">
          <a href="https://yourpaymentportal.com" class="button">Pay Fine Now</a>
        </p>
      </div>
      <div class="footer">
        🚔 Traffic Fine Management System | Contact Us: kavindimoneesha@gmail.com.com
      </div>
    </div>
  </body>
  </html>
`;
    await sendEmail(email, "Notice: Traffic Fine", emailBodyFine);
    // await sendEmail(email, "Notice: Traffic Fine", emailBodyFine);
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

//export const getFineByOid = async (req, res, next) => {
// try {
//  const fineId = req.params._id;

// const fine = await Fine.findById(fineId);

// if (fine) {
//  res.status(200).json(fine);
//} else {
// return next(404, "Fine not found");
// }
//} catch (error) {
// next(error);
//}
//};

export const getFineByOid = async (req, res, next) => {
  try {
    const fineId = req.params._id;

    const fine = await Fine.findById(fineId);

    if (!fine) {
      return next(404, "Fine not found");
    }

    if (!fine.block && !fine.state) {
      return res.status(200).json(fine);
    } else {
      return res
        .status(403)
        .json({ message: "Fine cannot be processed for payment" });
    }
  } catch (error) {
    next(error);
  }
};

export const getBlockFines = async (req, res, next) => {
  try {
    const fines = await Fine.find();

    if (!fines) {
      return next(404, "Fine not found");
    }
    const blockedFines = fines.filter((fine) => fine.block === true);

    if (blockedFines.length > 0) {
      return res.status(200).json(blockedFines);
    } else {
      return res.status(404).json({ message: "No blocked fines found" });
    }
  } catch (error) {
    next(error);
  }
};

export const fineUpdate = async (req, res, next) => {
  try {
    const fine = await Fine.findOne({ _id: req.params._id });

    const updateFine = await Fine.findByIdAndUpdate(
      fine._id,
      {
        $set: {
          block: req.body.block,
          state: req.body.state,
        },
      },
      { new: true }
    );
    res.status(200).json(updateFine);
    console.log("Success");
  } catch (error) {
    next(error);
  }
};

export const getBlockFine = async (req, res, next) => {
  try {
    const fineId = req.params._id;
    const fine = await Fine.findOne({ _id: fineId });

    if (fine) {
      res.status(200).json(fine);
    } else {
      return next(404, "Rule not found");
    }
  } catch (error) {
    next(error);
  }
};
