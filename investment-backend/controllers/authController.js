const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomError = require("../utils/customError");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { referralCode, ...userData } = req.body;

  let referrer = null;

  // Check if referral code is provided and find the referrer
  if (referralCode) {
    referrer = await User.findOne({ referralCode });

    if (!referrer) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid referral code",
      });
    }
  }

  // Create a new user with the provided data
  const newUser = new User(userData);

  // If a referrer was found, link the referrer to the new user
  if (referrer) {
    newUser.referrer = referrer._id;
  }

  const user = await newUser.save();

  // If a referrer was found, add the new user to the referrer's list of referrals
  if (referrer) {
    referrer.referrals.push(user._id);
    await referrer.save();
  }

  // Generate tokens
  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);

  // Set refresh token in a cookie and respond with user data and access token
  res
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
    .status(201)
    .json({
      status: "success",
      message: "User created successfully",
      user,
      token: accessToken,
    });
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  console.log("Hitting this end point");
  const { email, password } = req.body;
  if (!email || !password) {
    //check on the right status codes later
    const err = new CustomError("Fill all fields", 400);
    return next(err);
  }
  //check if a user with that mail exists
  const user = await User.findOne({ email }).populate("subscriptions.plan");
  if (!user) {
    const err = new CustomError("Invalid credentials", 401);
    return next(err);
  }

  const isPasswordMatch = await user.compareDbPassword(password, user.password);
  console.log(password);
  console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    const err = new CustomError("Invalid credentials", 400);
    return next(err);
  }
  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);
  console.log("backend sending details to client");
  res
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      status: "success",
      message: "user logged in",
      user,
      token: accessToken,
    });
});

exports.reAuthenticate = asyncErrorHandler(async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    const err = new CustomError("No token!! Not authenticated", 401);
    return next(err);
  }
  //verify or decode token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const err = new CustomError("Log in or sign up", 401);
    return next(err);
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  req.user = user;
  next();
});

exports.refreshToken = asyncErrorHandler(async (req, res, next) => {
  const accessToken = generateAccessToken(req.user?.id);
  const responseData = { token: accessToken, user: req.user };
  res.status(200).json(responseData);
});

exports.logOut = asyncErrorHandler(async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ status: "success", message: "logout successful" });
});

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  });
};
