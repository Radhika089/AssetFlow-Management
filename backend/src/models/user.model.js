import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required for creating a user."],
      unique: [true, "Email must me unique"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email should be in a valid format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [6, "Password should be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["Admin", "Asset Manager", "Department Head", "Employee"],
      default: "Employee",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
