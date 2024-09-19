const cron = require("node-cron");
const User = require("../models/User");
const Plan = require("../models/Plan");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const cloudinary = require("../utils/cloudinary");
const calculateNextPaymentDate = require("../utils/subscription");

//handle referral => to be done
exports.getUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
});

//getting a user
exports.getUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.addReferral = asyncErrorHandler(async (req, res, next) => {
  const { referralCode } = req.body;
  const userId = req.user._id; // Assuming user is authenticated and user ID is available

  // Find the referrer by the referral code
  const referrer = await User.findOne({ referralCode });

  if (!referrer) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid referral code",
    });
  }

  // Prevent the user from referring themselves
  if (referrer._id.equals(userId)) {
    return res.status(400).json({
      status: "fail",
      message: "You cannot refer yourself",
    });
  }

  // Ensure the user hasn't already been referred
  const user = await User.findById(userId);
  if (user.referrer) {
    return res.status(400).json({
      status: "fail",
      message: "You have already been referred",
    });
  }

  // Link the referrer to the user
  user.referrer = referrer._id;
  referrer.referrals.push(user._id);

  // Save both user and referrer
  await user.save();
  await referrer.save();

  res.status(200).json({
    status: "success",
    message: "Referral added successfully",
    referrerId: referrer._id,
  });
});

exports.getUserReferrals = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id; // Assuming the user is authenticated and the user ID is available

  // Find the user by ID and populate the referrals field
  const user = await User.findById(userId).populate("referrals");

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    referrals: user.referrals,
  });
});

//deleting a user by admin
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: `${user.name} has been deleted`,
  });
});

//debit or credit user's balance by admin
exports.debitOrCreditUser = asyncErrorHandler(async (req, res, next) => {
  const { id, action, field, amount } = req.body;
  const user = await User.findById(id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  if (action === "debit") {
    user[field] -= amount;
  } else if (action === "credit") {
    user[field] += amount;
  } else {
    const err = new CustomError("This action is not recognized", 400);
    return next(err);
  }
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: `${user.name}'s intended balance has been ${action}`,
  });
});

exports.authorizeUserLogin = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  user.isAuthorized = !user.isAuthorized;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: user.isAuthorized
      ? "User has been granted access"
      : "User access has been revoked",
  });
});

//update user profile
exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  //user id should be present in the req.user

  const user = await User.findById(req.user._id);

  const { file } = req;

  if (!user) {
    const err = new CustomError("No user found", 404);
    return next(err);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true }
  );

  if (file) {
    if (user.profilePhoto) {
      const { public_id: imageId } = user.profilePhoto;
      await cloudinary.uploader.destroy(`investment/${imageId}`);
    }
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: "investment" }
    );

    updatedUser.profilePhoto = { url, public_id };
  }
  await updatedUser.save();
  res.status(200).json({
    status: "success",
    user: updatedUser,
    message: "Details updated",
  });
});

//change password
exports.changeUserPassword = asyncErrorHandler(async (req, res, next) => {
  //get the user from req.user
  const user = await User.findById(req.user._id);
  //old password and new password should be part of the req.body
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isPasswordMatch = await user.compareDbPassword(
    oldPassword,
    user.password
  );
  console.log(isPasswordMatch);
  if (isPasswordMatch === false) {
    const err = new CustomError("Incorrect password", 400);
    return next(err);
  }
  if (newPassword !== confirmPassword) {
    const err = new CustomError("Passwords do not match", 400);
    return next(err);
  }

  user.password = newPassword;
  user.confirmPassword = newPassword;

  await user.save();
  res.status(200).json({
    status: "sucess",
    message: "Password has been changed",
  });
});

//toggle withdrawal status by admin
exports.changeWithdrawalStatus = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    const err = new CustomError("User not found", 404);
    return next(err);
  }
  user.isRestrictedFromWithdrawal = !user.isRestrictedFromWithdrawal;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Withdrawal status has been changed",
  });
});

const calculateCronExpression = (frequency, startDate) => {
  //parsing startDate into date object
  const startDateObj = new Date(startDate);

  //determining cron expression based on frequency
  switch (frequency) {
    case "daily":
      //this cron expression signifies zero hour and 0 minute which is midnight(0:00)
      return "0 0 * * *";
    case "weekly":
      const weekDay = startDateObj.getDay();
      const hourOfTheDay = startDateObj.getHours();
      const minuteOfTheDay = startDateObj.getMinutes();
      const secondOfTheDay = startDateObj.getSeconds();

      return `${secondOfTheDay} ${minuteOfTheDay} ${hourOfTheDay} * * ${weekDay}`;
    case "monthly":
      const dayOfTheMonth = startDateObj.getDate();
      return `0 0 ${dayOfTheMonth} * *`;
    default:
      //using weekly as default
      return `${secondOfTheDay} ${minuteOfTheDay} ${hourOfTheDay} * * ${weekDay}`;
  }
};

const updateUserBalancePerSubscription = asyncErrorHandler(
  async (user, subscription) => {
    //the subscription here is each individual plan that the user belongs to
    //we are taking the user into this function.
    const plan = await Plan.findById(subscription.plan);
    if (!plan) {
      const err = new CustomError("Plan not found", 404);
      return new err();
    }
    //calculate increase in the user balance based on percentage and cost of the enrolled plan
    //plan.topUpAmount refers to the percentage increase for now at least
    const topUp = (plan.topUpAmount / 100) * subscription.cost;
    await User.findByIdAndUpdate(
      user.id,
      { $inc: { investedFundsAndReturns: topUp } },
      { new: true, runValidators: true }
    );
    console.log("A user balance has been updated");
  }
);

//we need to take note of the money invested on each plans by the various users at every point in time
exports.scheduleUserBalanceUpdates = asyncErrorHandler(async () => {
  try {
    const users = await User.find({ "subscriptions.0": { $exists: true } });

    users.forEach(async (user) => {
      let totalProfit = 0;
      console.log(user);
      for (let subscription of user.subscriptions) {
        const plan = await Plan.findById(subscription.plan);
        console.log(subscription);

        if (plan && new Date() >= subscription.nextPaymentDate) {
          const profit = (subscription.cost * plan.topUpAmount) / 100;
          totalProfit += profit;

          // Calculate the next payment date
          const nextPaymentDate = calculateNextPaymentDate(
            subscription.nextPaymentDate,
            plan.topUpInterval
          );

          // Update the subscription with the new next payment date
          subscription.nextPaymentDate = nextPaymentDate;
        }
      }

      if (totalProfit > 0) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $inc: { withdrawableFunds: totalProfit },
            subscriptions: user.subscriptions,
          },
          { new: true, runValidators: true }
        );
        console.log(`Credited $${totalProfit} profit to user ${user.email}`);
      }
    });
    console.log("Updste balance updsted");
  } catch (error) {
    console.error("Error running profit crediting cron job:", error);
  }
});

// no need calculating con expression, since this is likely to update every day
const topUpUser = asyncErrorHandler(async (req, res, next) => {
  // console.log("add $10 to user's total Deposit");
  const users = await User.find();
  const check = true;
  if (!check) {
    const err = new CustomError("Plan not found", 404);
    return next(err);
  }
  for (const user of users) {
    //add $10 to toalDeposit
    for (const subscription of user.subscriptions) {
      cron.schedule("0 0 * * *", async function () {
        const plan = await Plan.findById(subscription.plan);
        const topUpAmount = (plan.topUpAmount / 100) * subscription.cost;
        console.log(topUpAmount);
        user.investedFundsAndReturns =
          user.investedFundsAndReturns + topUpAmount;
        user.totalProfit = user.totalProfit + topUpAmount;
        await user.save({ validateBeforeSave: false });
        console.log(
          `we just updated ${user.name}'s invested funds and returns field`
        );
      });
    }
  }
});
// topUpUser();
