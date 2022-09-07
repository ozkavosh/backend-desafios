import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: "string" },
  email: { type: "string" },
  password: { type: "string" },
});

export default mongoose.model("User", userSchema);
