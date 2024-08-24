import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is Required"],
    },
    posistion: {
      type: String,
      required: [true, "Posistion is Required"],
      minlength: 20,
    },
    status: {
      type: String,
      enum: ["Pending", "Reject", "Interview", "Viewed"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelancing"],
      default: "Full-time",
    },
    workLocation: {
      type: String,
      required: [true, "location is Required"],
      default: "Bengaluru",
    },
    workMode: {
      type: String,
      enum: ["Work From Office", "Work From Home", "Remote", "Hybrid"],
      default: "Work From Office",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// JSON WebToken
jobSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export default mongoose.model("Job", jobSchema);
