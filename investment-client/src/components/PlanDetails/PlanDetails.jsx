/* eslint-disable react/prop-types */
import { LuLoader2 } from "react-icons/lu";

function PlanDetails({ amount, handleInvesmentClick, plan, loading }) {
  console.log("plan", plan);
  return (
    <div className="p-3">
      <div className="border border-gray-500 dark:border-white rounded-md p-3">
        <h2>Your investment details</h2>
        <div className="grid grid-cols-2 gap-y-7 gap-x-1 my-7">
          <div>
            <p className="text-xs text-gray-700 dark:text-white">
              Name of plan
            </p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.name}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-white">
              Top up interval
            </p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.topUpInterval}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-white">
              Minimum price
            </p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.minimumPrice}EGP
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-white">
              Maximum price
            </p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.maximumPrice}EGP
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-white">Gift Bonus</p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.giftBonus}EGP
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 dark:text-white">Duration</p>
            <span className=" capitalize text-xs font-bold text-red-300">
              {plan.duration}
            </span>
          </div>
        </div>
        {/* Payment method */}
        <div className="border-y  border-gray-500 dark:border-white flex items-center space-x-3 py-3">
          <span className="text-xs text-gray-500 dark:text-white">
            {" "}
            Payment method
          </span>
          <span className="capitalize text-xs font-bold text-red-300">
            Account Balance
          </span>
        </div>
        {/* amount to invest */}
        <div className="flex items-center justify-between my-4">
          <span className="text-xs text-gray-500 dark:text-white">
            {" "}
            Amount to invest
          </span>
          {amount && (
            <span className="capitalize text-lg  font-bold text-red-400">
              {amount}EGP
            </span>
          )}
        </div>
        <div>
          <button
            onClick={handleInvesmentClick}
            className="bg-red-400 text-white w-full px-2 py-3 rounded-r-md rounded-tl-md"
          >
            {loading ? (
              <LuLoader2 className="animate-spin" />
            ) : (
              "Confirm & Invest"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
