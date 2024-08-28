/* eslint-disable react/prop-types */
import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { MdOutlineDone } from "react-icons/md";

function WalletDetails({
  loading,
  selected,
  amount,
  receipt,
  setReceipt,
  handleDeposit,
}) {
  const [copy, setCopy] = useState(false);
  const copyWalletAddress = () => {
    setCopy(true);
    navigator.clipboard.writeText(selected.walletAddress);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <div className="col-span-4 lg:col-span-3 py-3 px-5">
      <div className="w-full bg-red-300 rounded-2xl p-2 flex space-x-2 items-center font-montserrat">
        <div className="bg-red-500 text-white font-bold text-xs rounded-2xl px-2">
          Your payment method
        </div>
        <p className="uppercase text-lg text-white">{selected.name}</p>
      </div>
      <div className="py-4">
        <p className="text-xl text-gray-700  dark:text-white font-montserrat ">
          You are to make payment of{" "}
          <span className="font-bold">{amount}EGP </span> using your selected
          payment method.
        </p>
        <div className="py-3">
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/025/439/329/non_2x/phone-money-logo-template-design-modern-mobile-payment-logo-for-your-company-free-vector.jpg"
            }
            alt={selected.name}
            className="h-[200px] w-[200px]"
          />
        </div>
        {/* wallet address */}
        <div>
          <p className="font-montserrat text-xl text-gray-700  dark:text-white capitalize font-bold">
            Local TRansfer address:
          </p>
          <div className="relative bg-white flex items-center border border-gray-500 dark:border-white rounded-md ">
            <input
              readOnly
              type="text"
              className=" border-none flex-1 outline-none p-3 text-gray-500"
              value={selected.value}
            />
            {!copy ? (
              <button onClick={copyWalletAddress} className=" cursor-pointer">
                <ClipboardDocumentIcon className="w-7 h-7" />
              </button>
            ) : (
              <div className="flex items-center space-x-1 cursor-pointer ">
                <MdOutlineDone size={20} />
                <span className="text-xs">Copied</span>
              </div>
            )}
          </div>
          {/* <span className="font-montserrat uppercase text-gray-500">
            <span className="font-semibold capitalize"> Network type : </span>
            {selected.network}
          </span> */}
        </div>

        {/* payment proof inpaut */}
        <div className="my-4 font-montserrat ">
          <p className="text-lg text-gray-500 dark:text-white py-2">
            Upload payment proof after payment
          </p>
          <div className="py-2">
            <input
              onChange={handleFileChange}
              accept="image/*"
              type="file"
              name="receipt"
              className="w-full border border-gray-500 outline-none rounded-md  p-2 text-gray-500 dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div>
        </div>
        {/* submit button */}
        <div className="my-4 ">
          <button
            onClick={handleDeposit}
            disabled={receipt ? false : true}
            className={`${
              receipt ? "bg-red-400 cursor-pointer" : "bg-gray-500"
            }  text-white w-full px-2 py-3 rounded-r-md rounded-tl-md `}
          >
            {loading ? "Processing" : "Submit Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletDetails;
