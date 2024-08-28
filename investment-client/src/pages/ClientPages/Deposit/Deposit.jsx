import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DepositForm from "../../../components/DepositForm/DepositForm";
// import { paymentMethods } from "../../../assets/data";
import WalletDetails from "../../../components/WalletDetails/WalletDetails";
// import { useSelector, useDispatch } from "react-redux";
// import { makeDeposit, reset } from "../../features/deposits/depositSlice";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../../utils/toastify";
import { useAuth } from "../../../hooks/useAuth";

function Deposit() {
  const [amount, setAmount] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selected, setSelected] = useState(paymentMethods[0]);
  const [loading, setLoading] = useState(false);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const { user, setUser } = useAuth();

  const getNumbers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}numbers`,
        {
          withCredentials: true,
        }
      );
      setPaymentMethods(data.numbers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNumbers();
  }, [getNumbers]);

  const handleDeposit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("amount", amount);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}deposit`,
        formData,
        { withCredentials: true }
      );
      setShowWalletDetails(false);
      //pendingDeposit totalDeposit
      toast.success(data.message, toastifyConfig);
      setUser((prev) => ({
        ...prev,
        pendingDeposit: parseInt(data.amountDeposited) + prev.pendingDeposit,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "error", toastifyConfig);
    } finally {
      setLoading(false);
    }
  };
  const proceedToPayment = () => {
    if (amount && selected) {
      setShowWalletDetails(true);
    } else {
      alert("Enter an amount");
    }
  };
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Fund your account balance
      </h1>
      {/* form content or something like that */}
      <div className="grid grid-cols-4 gap-2 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
        {showWalletDetails ? (
          <WalletDetails
            loading={loading}
            selected={selected}
            amount={amount}
            receipt={receipt}
            setReceipt={setReceipt}
            handleDeposit={handleDeposit}
          />
        ) : (
          <DepositForm
            amount={amount}
            setAmount={setAmount}
            paymentMethods={paymentMethods}
            proceedToPayment={proceedToPayment}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div className=" col-span-4 lg:col-span-1  mt-5 text-gray-700  dark:text-white">
          <div className="border border-gray-500 dark:border-white rounded-md">
            <div className="flex  border-b border-gray-500 dark:border-white p-4">
              <p className="flex-1 font-semibold">Pending Deposits</p>
              <div className="flex-1">
                <p className="font-semibold ">{user?.pendingDeposit}EGP</p>
                <span className="text-sm text-gray-500">Amount</span>
              </div>
            </div>
            <div className="p-4 ">
              <Link
                to="/dashboard/transactions"
                className="text-sm text-gray-500"
              >
                View deposit history
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* {depositIsLoading && <OverlayLoaderComponent />} */}
      <ToastContainer containerId="depositRequest" />
    </>
  );
}

export default Deposit;
