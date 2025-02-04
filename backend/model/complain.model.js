import mongoose from "mongoose";

const complainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pStation: {
      type: String,
      required: true,
    },

    complain: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Complain = mongoose.model("Complain", complainSchema);
export default Complain;
