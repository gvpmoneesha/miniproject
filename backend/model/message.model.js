import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    station: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    senderImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;