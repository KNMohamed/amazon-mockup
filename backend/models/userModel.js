import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type: String, lowercase: true, required:true, unique:true},
  password: {type: String, required:true, dropDups: true},
  isAdmin: {type: Boolean, required:true, default: false}
});

const userModel = new mongoose.model("User", userSchema);

export default userModel;