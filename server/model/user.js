const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const expireDate = "1h";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    email: {
      required: [true, "please provide an email"],
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      select: false,
      minlength: [4, "please provide 4 character"],
    },
    photo: {
      type: String,
      default: "user.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    readList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Story",
      },
    ],
    readListLength: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: String,
    resetPassWordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.generateJwtFromUser = function() {
  const JWT_SECRET = "a;fadlkjoeqdlaksdjfaldsjfaldfhdalsdadlfkaldaalsjfl";
  const payload = {
    id: this._id,
    name: this.username,
    email: this.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m'});
  return token;
};

UserSchema.methods.getResetPasswordFromUser = function() {
  const RESET_PASS_EX = 60;
  const randomHex = crypto.randomBytes(20).toString("hex");
  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHex)
    .digest("hex");
  this.resetPasswordToken = resetPasswordToken;
  this.resetPassWordExpire = Date.now() + parseInt(RESET_PASS_EX);
  return this.resetPasswordToken;
};

module.exports = mongoose.model("User", UserSchema);
