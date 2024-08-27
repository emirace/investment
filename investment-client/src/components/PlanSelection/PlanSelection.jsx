/* eslint-disable react/prop-types */
import { useAuth } from "../../hooks/useAuth";
function PlanSelection({
  plans,
  setPlan,
  investmentAmount,
  setInvestmentAmount,
  setPaymentSource,
}) {
  const { user } = useAuth();
  const quickAmounts = [500, 1000, 3000, 5000, 8000, 12000];
  const handleClick = (number) => {
    setInvestmentAmount(number);
  };
  const handlePlanSelection = (id) => {
    const selectedPlan = plans.filter((c) => c._id === id)[0];
    setPlan(selectedPlan);
  };
  return (
    <div className="col-span-4 xl:col-span-3 p-3">
      {/* seek to replace with formik later */}
      <form className="border border-gray-500 dark:border-white rounded-md p-4">
        <div className="mb-7">
          {/* value of this is going to be the id of the plan bcecause that is what we will be sending to the backend */}
          <select
            name="plan"
            onChange={(e) => handlePlanSelection(e.target.value)}
            className="bg-red-400 p-4 rounded-lg text-white"
          >
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-14">
          <p className="dark:text-white">Choose Quick Amount to Invest</p>
          <div className="my-2 flex flex-wrap items-center ">
            {quickAmounts.map((amount) => (
              <div
                onClick={() => handleClick(amount)}
                key={amount}
                className={`${
                  amount === investmentAmount ? "bg-red-400" : "bg-slate-200"
                } flex items-center min-w-[100px] justify-center px-4 py-3 rounded-md cursor-pointer mr-4 mt-2`}
              >
                {amount}EGP
              </div>
            ))}
          </div>
          <div className="mt-14">
            <p className="dark:text-white">Or Enter Your Amount</p>
            <div className="my-4">
              <input
                type="number"
                placeholder="Enter Amount"
                className="border border-gray-500 outline-none rounded-md w-full p-2 dark:text-white dark:bg-slate-900 dark:border-white"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-14">
            <p className="dark:text-white">Payment Method</p>
            <p className="text-xs text-gray-700 dark:text-white">
              Money to be debited from your account balance
            </p>
            <div className="my-4">
              <select
                name="paymentSource"
                onChange={(e) => setPaymentSource(e.target.value)}
                className="border w-full border-gray-500 p-2 rounded-lg dark:text-white dark:bg-slate-900 dark:border-white "
              >
                <option value={"approvedBalance"}>
                  {`Account Balance:   ${user?.approvedBalance}EGP`}
                </option>
                <option value={"referralBonus"}>
                  {`Bonus:   ${user?.referralBonus}EGP`}
                </option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlanSelection;
