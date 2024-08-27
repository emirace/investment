const Plan = require("../models/Plan");
const User = require("../models/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const calculateNextPaymentDate = require("../utils/subscription");

//admin logic for creating a new plan
exports.createPlan = asyncErrorHandler(async (req, res, next) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.status(201).json({
    status: "success",
    message: `${plan.name} plan has been created successfully`,
  });
});

//public logic for getting all plans
exports.getPlans = asyncErrorHandler(async (req, res, next) => {
  const plans = await Plan.find();
  res.status(200).json({
    status: "success",
    plans,
  });
});

//logic for getting a single plan
exports.getPlan = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const plan = await Plan.findById(id);
  if (!plan) {
    const err = new CustomError("No plan found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    plan,
  });
});

//admin logic for updating an existing plan
exports.updatePlan = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  const plan = await Plan.findById(id);
  if (!plan) {
    const err = new CustomError("No plan found", 404);
    return next(err);
  }
  const updatedPlan = await Plan.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    message: `${updatedPlan.name}'s details has been updated`,
  });
});

//delete plan  => to be worked on because somethings need to be taken into consideration
exports.deletePlan = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const plan = await Plan.findById(id);
  console.log(plan.name);
  if (!plan) {
    const err = new CustomError("Plan not found", 404);
    return next(err);
  }
  await Plan.findByIdAndDelete(id);
  //we want to get users with such plan and delete the plan from their subscription array
  const users = await User.find();

  for (const user of users) {
    user.subscriptions = user.subscriptions.filter((subscription) => {
      return subscription.plan != id;
    });

    // Save the user after filtering subscriptions
    await user.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: "success",
    message: `${plan.name} has been deleted`,
  });
});

//during withdrawal, OTP needs to be sent to mail

//subscribe to a plan
//going to be a patch request because we want to update the user field
//the below works if we are assuming that our user cannot subscribe to multiple plans at the same time
exports.subscribeToSinglePlan = asyncErrorHandler(async (req, res, next) => {
  //i want a user to be able to choose an amount to invest without doing the auto deduction
  const { planId, amount } = req.body;

  //check if plan exists and throw error if it doesn't
  const plan = await Plan.findById(planId);
  if (!plan) {
    const err = new CustomError("There is no such plan", 404);
    return next(err);
  }

  //user is contained in req.user
  if (plan.minimumPrice > req.user.approvedBalance) {
    const err = new CustomError(
      "Your available balance is not enough for you to subscribe to this  plan",
      402
    );
    return next(err);
  }

  //if the money in the Balance is bigger
  //previously req.user.approvedBalance now being changed to amount
  if (plan.maximumPrice < amount) {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { approvedBalance: -plan.maximumPrice } },
      { new: true, runValidators: true }
    );

    //where am i actually subscribing to the plan here?
    res.status(200).json({
      status: "success",
      message: `Your successfully subscribed to ${plan.name} plan and $${plan.maximumPrice} has been deducted`,
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $inc: { approvedBalance: -req.user.approvedBalance } },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    message: `You successfully subscribed to ${plan.name} plan`,
  });
});

//right subscribe to plan because a user can subscribe to multiple plans here
exports.subscribeToPlan = asyncErrorHandler(async (req, res, next) => {
  const { planId, amount, paymentSource } = req.body; // Added paymentSource to req.body
  const plan = await Plan.findById(planId);

  if (!plan) {
    return next(new CustomError("Plan does not exist", 404));
  }

  if (amount < plan.minimumPrice) {
    return next(
      new CustomError(
        `$${amount} too low for selected plan. Increase the amount`,
        400
      )
    );
  }

  let availableBalance;
  let balanceField;

  // Determine the payment source
  if (paymentSource === "approvedBalance") {
    availableBalance = req.user.approvedBalance;
    balanceField = "approvedBalance";
  } else if (paymentSource === "referralBonus") {
    availableBalance = req.user.referralBonus;
    balanceField = "referralBonus";
  } else {
    return next(new CustomError("Invalid payment source", 400));
  }

  if (amount > availableBalance) {
    return next(new CustomError("Insufficient funds for this plan", 402));
  }

  const nextPaymentDate = calculateNextPaymentDate(
    new Date(),
    plan.topUpInterval
  );

  const newSubscription = {
    plan: plan._id,
    startDate: new Date(),
    cost: amount,
    frequency: plan.topUpInterval,
    nextPaymentDate,
  };

  const updateData = {
    $inc: {
      [balanceField]: -amount,
      investedFundsAndReturns: amount,
    },
    $push: { subscriptions: { ...newSubscription } },
  };

  // Check if the user was referred by another user
  if (req.user.referrer) {
    const referrer = await User.findById(req.user.referrer);
    if (referrer) {
      const referralBonus = amount * 0.1; // 10% referral bonus
      await User.findByIdAndUpdate(
        referrer._id,
        {
          $inc: {
            referralBonus: referralBonus,
          },
        },
        { new: true, runValidators: true }
      );
      console.log(`Added $${referralBonus} to referrer ${referrer.email}`);
    }
  }

  // Update the user's subscription and balance
  await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  });

  delete newSubscription.plan;
  res.status(200).json({
    status: "success",
    message: `You successfully subscribed to ${plan.name} plan and $${amount} was deducted from your ${paymentSource}`,
    plan: newSubscription,
  });
});
