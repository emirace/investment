import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../hooks/useAuth";
import UserCurrentPlans from "../UserCurrentPlans/UserCurrentPlans";
import UserTransactions from "../UserTransactions/UserTransactions";

function ClientDashboardHome() {
  const { user } = useAuth();
  const widgets = [
    {
      title: "Account Balance",
      amount: user?.approvedBalance,
      icon: <CurrencyDollarIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-orange-500",
    },
    {
      title: "Total Profit",
      amount: user?.totalProfit,
      icon: <BanknotesIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-green-400",
    },
    {
      title: "Total Deposit",
      amount: user?.totalDeposit,
      icon: <ArrowDownIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Total Withdrawal",
      amount: user?.totalWithdrawal,
      icon: <ArrowUpIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-yellow-400",
    },
    {
      title: "Bonus",
      amount: user?.referralBonus,
      icon: <ArrowUpIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-yellow-400",
    },
    {
      title: "Inv. Funds And Returns",
      amount: user?.investedFundsAndReturns,
      icon: <CreditCardIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-purple-500",
    },
  ];
  return (
    <>
      {/* this user should be replaced with the name of the logged in user */}
      <h1 className="text-gray-700 text-2xl md:text-3xl mb-16 font-bold dark:text-white font-montserrat">
        {/* was user before */}
        Welcome {user?.name}
      </h1>

      <div className="my-4 border border-white p-6 rounded-lg">
        Bounce back 10% percent for the first 500 Egyptian users
      </div>
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white font-montserrat">
        Account Summary
      </h2>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        {widgets.map((widget) => (
          <ContentWrapper
            key={widget.title}
            icon={widget.icon}
            iconBgColor={widget.iconBgColor}
            number={widget.amount}
            text={widget.title}
            isMoney
          />
        ))}
      </div>
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white font-montserrat">
        Active Plans
      </h2>
      {/* Existing plan div */}
      <UserCurrentPlans />

      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white font-montserrat">
        Recent Transactions
      </h2>
      {/* transactions table to be dynamically rendered when i incorporate my backend */}
      <div className="grid col-1 bg-white min-h-64 max-h-[400px] overflow-scroll shadow-sm dark:bg-slate-800  p-4">
        <div className="flex flex-col">
          <Link
            to="transactions"
            className="self-end text-sm text-red-400 uppercase  flex items-center space-x-2"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-red-400 " />
            View all transactions
          </Link>
          {/* user transaction table */}
          <UserTransactions />
        </div>
      </div>
    </>
  );
}

export default ClientDashboardHome;
