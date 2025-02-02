import Fine from "../model/fine.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "rmsksamarakoon@gmail.com",
      subject,
      html: text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const checkFinesAndSendEmails = async () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
  console.log(`Checking fines issued before today: ${today}`);

  try {
    const fines = await Fine.find({
      expireDate: { $lt: new Date(today) }, // Find fines where issueDate is before today
      state: false, // Assuming 'state' is false for unpaid fines
    });

    if (fines.length === 0) {
      console.log("No unpaid fines found before today.");
      return;
    }

    for (const fine of fines) {
      const emailBody = `
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
        🚨 Traffic Fine Payment Reminder 🚨
      </div>
      <div class="content">
        <p>Hello <strong>${fine.dName}</strong>,</p>
        <p>You have an unpaid traffic fine issued on <strong>${
          fine.issueDate.toISOString().split("T")[0]
        }</strong>.</p>
        
        <div class="details">
          <p><strong>Violation:</strong> ${fine.violation}</p>
          <p><strong>Vehicle No:</strong> ${fine.vNo}</p>
          <p><strong>Location:</strong> ${fine.place}</p>
          <p><strong>Charge:</strong> Rs.${fine.charge}</p>
          <p><strong>Expiry Date:</strong> ${
            fine.expireDate.toISOString().split("T")[0]
          }</p>
        </div>
        
        <p>Please pay your fine before the due date to avoid further penalties.</p>
        
        <p style="text-align: center;">
          <a href="https://yourpaymentportal.com" class="button">Pay Fine Now</a>
        </p>
      </div>
      <div class="footer">
        🚔 Traffic Fine Management System | Contact Us: support@tfms.com
      </div>
    </div>
  </body>
  </html>
`;

      await sendEmail(fine.dName, "Reminder: Unpaid Traffic Fine", emailBody);
      //  await sendEmail(fine.dName, "Reminder: Unpaid Traffic Fine", emailBody);
    }
  } catch (error) {
    console.error("Error fetching fines:", error);
  }
};

//export
