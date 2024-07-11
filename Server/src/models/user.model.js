import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password Is required"],
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },

  refreshToken: {
    type: String,

  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'User', 'Host'],
    default: "User"
  },

  createdEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }],

  createdCertificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate"
  }],

  recievedCertificates:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate"
    }
  ],

  joinedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}
userSchema.methods.genrateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}
const User = mongoose.model('User', userSchema);

export default User