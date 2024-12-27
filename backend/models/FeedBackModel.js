import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
        type: String,
        required: [true, "Rating is required"],
       
      },
    comments: {
        type: String,
        required: [true, "Comments are required"],
       
        trim: true,
      },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
const feedbackModel =mongoose.model("Feedback", feedbackSchema);

export default feedbackModel;
