import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PlanSelection from "../../../components/PlanSelection/PlanSelection";
import PlanDetails from "../../../components/PlanDetails/PlanDetails";
import toastifyConfig from "../../../utils/toastify";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { LuLoader2 } from "react-icons/lu";
import Refetch from "../../../components/Refetch/Refetch";

function Invest() {
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [paymentSource, setPaymentSource] = useState("approvedBalance");
  const [error, setError] = useState(false);
  const { setUser, user } = useAuth();
  console.log(user);
  const getPlans = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}plan`,
        {
          withCredentials: true,
        }
      );
      setPlans(data.plans);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPlans();
  }, [getPlans]);
  useEffect(() => {
    if (plans) {
      setPlan(plans[0]);
    }
  }, [plans]);

  const handleInvestmentClick = async () => {
    setInvestmentLoading(true);
    const planObject = {
      planId: plan._id,
      amount: investmentAmount,
      paymentSource,
    };
    // subscribe to plan logic here
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}plan/subscribe`,
        planObject,
        {
          withCredentials: true,
        }
      );
      const newSub = { ...data.plan, plan };
      setUser((prev) => ({
        ...prev,
        approvedBalance: prev.approvedBalance - parseInt(investmentAmount),
        investedFundsAndReturns:
          prev.investedFundsAndReturns + parseInt(investmentAmount),
        subscriptions: Array.isArray(prev.subscriptions)
          ? [...prev.subscriptions, newSub]
          : [newSub],
      }));
      toast.success(data.message, toastifyConfig);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setInvestmentLoading(false);
    }
  };
  if (error) {
    return (
      <Refetch handleRetry={getPlans} text="We were unable to get the plans" />
    );
  }

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Get started with your investment
      </h1>
      {loading && (
        <div className="w-full h-full flex flex-col items-center justify-center font-montserrat">
          <LuLoader2
            size={35}
            className="text-slate-900 dark:text-white animate-spin"
          />
          <p className="text-sm dark:text-white">Getting plan details...</p>
        </div>
      )}
      {plans.length > 0 && (
        <div className="grid  xl:grid-cols-4 gap-2 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
          <PlanSelection
            plans={plans}
            investmentAmount={investmentAmount}
            setInvestmentAmount={setInvestmentAmount}
            plan={plan}
            setPlan={setPlan}
            setPaymentSource={setPaymentSource}
          />

          {plan && (
            <div className=" col-span-4 xl:col-span-1  mt-5 text-gray-700  dark:text-white font-montserrat">
              <PlanDetails
                amount={investmentAmount}
                handleInvesmentClick={handleInvestmentClick}
                plan={plan}
                loading={investmentLoading}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Invest;
