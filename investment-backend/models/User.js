const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Subscription schema
const subscriptionSchema = new mongoose.Schema({
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: Date,
});

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  profilePhoto: {
    type: Object,
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  approvedBalance: {
    type: Number,
    default: 0,
  },
  totalDeposit: {
    type: Number,
    default: 0,
  },
  pendingDeposit: {
    type: Number,
    default: 0,
  },
  investedFundsAndReturns: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isRestrictedFromWithdrawal: {
    type: Boolean,
    default: false,
  },
  totalProfit: {
    type: Number,
    default: 0,
  },
  withdrawableFunds: {
    type: Number,
    default: 0,
  },
  totalWithdrawal: {
    type: Number,
    default: 0,
  },
  subscriptions: [subscriptionSchema],
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  referralBonus: {
    type: Number,
    default: 0,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  isAuthorized: {
    type: Boolean,
    default: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (val) {
        if (this.isModified("password")) {
          return val === this.password;
        }
        return true;
      },
      message: "Password confirmation do not match",
    },
    required: function () {
      return this.isNew || this.isModified("password");
    },
  },
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});

// Middleware to generate a unique referral code before saving
userSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(3).toString("hex"); // Generates a 6-character code
  }
  next();
});

// Method to compare passwords
userSchema.methods.compareDbPassword = async function (password, dbPassword) {
  return await bcrypt.compare(password, dbPassword);
};

module.exports = mongoose.model("User", userSchema);
