/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RadioGroup, Label, Description, Radio } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function DepositForm({
  //   amount,
  setAmount,
  paymentMethods,
  proceedToPayment,
  selected,
  setSelected,
}) {
  return (
    <div className="col-span-4 lg:col-span-3 p-3">
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
        Enter Amount
      </h2>
      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          className="border border-gray-500 outline-none rounded-md w-full p-2 dark:text-white dark:bg-slate-900 dark:border-white"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="w-full  py-4">
        <div className="mx-auto ">
          <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
            Choose Payment Method from the list below
          </h2>
          <RadioGroup value={selected} onChange={setSelected}>
            <Label className=" sr-only">Payment method</Label>
            <div className="grid  sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <Radio
                  key={method.name}
                  value={method}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white  ring-opacity-60 ring-offset-2 ring-offset-red-300"
                        : ""
                    }
                  ${
                    checked ? "bg-red-400 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <Label
                              as="div"
                              className={`flex items-center space-x-2 font-medium  uppercase ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              <img
                                src={
                                  "https://static.vecteezy.com/system/resources/previews/025/439/329/non_2x/phone-money-logo-template-design-modern-mobile-payment-logo-for-your-company-free-vector.jpg"
                                }
                                alt={method.value}
                                className="w-[50px] h-[50px]"
                              />
                              <p>{method.value}</p>
                            </Label>
                            <Description
                              as="div"
                              className={`ml-14 capitalize ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <p>Fast</p>
                              <p>low fee</p>
                            </Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckCircleIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="my-4">
        <button
          onClick={proceedToPayment}
          className="bg-red-400 w-full text-white px-2 py-3 rounded-r-md rounded-tl-md"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default DepositForm;
