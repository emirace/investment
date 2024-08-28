import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { withdrawalNetworks } from "../../../assets/data";
import WithdrawalInstruction from "../../../components/WithdrawlInstruction/WithdrawalInstruction";
import WithdrawalForm from "../../../components/WIthdrawalForm/WithdrawalForm";
function Withdrawal() {
  const [network, setNetwork] = useState(null);
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Place a withdrawal
      </h1>
      <div className="grid grid-cols-4 gap-2 p-2 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
        <div className="col-span-4 lg:col-span-3 py-3 lg:px-5">
          <div className="bg-red-100 py-3 font-bold text-xl">
            Current Withdrawable Balance : {user?.withdrawableFunds}EGP
          </div>
          {/* select network div */}
          {user?.withdrawableFunds < 5 ? (
            <div className="w-full my-7 text-red-600 font-bold ">
              Your withdrawable funds is less than 5EGP and hence you can&apos;t
              place a withdrawal request right now
            </div>
          ) : (
            <>
              <div className="mt-5">
                <select
                  onChange={(e) => setNetwork(e.target.value)}
                  name=""
                  id=""
                >
                  <option value="">Select preferred network</option>
                  {withdrawalNetworks.map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>
              </div>
              {/* form */}
              {network && <WithdrawalForm network={network} />}
            </>
          )}
        </div>
        {/* instruction */}
        <WithdrawalInstruction network={network} />
      </div>
    </>
  );
}

export default Withdrawal;
