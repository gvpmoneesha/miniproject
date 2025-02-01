import mongoose from "mongoose";

const fineShema = new mongoose.Schema(
  {
    dId: {
      type: String,
      required: true,
    },

    dName: {
      type: String,
      required: true,
    },

    vNo: {
      type: String,
      required: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    expireDate: {
      type: Date,
      required: true,
    },

    violation: {
      type: String,
      required: true,
    },

    pId: {
      type: String,
      required: true,
    },

    pName: {
      type: String,
      required: true,
    },

    pStation: {
      type: String,
      required: true,
    },

    charge: { type: String, required: true },

    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Fine = mongoose.model("Fine", fineShema);
export default Fine;
