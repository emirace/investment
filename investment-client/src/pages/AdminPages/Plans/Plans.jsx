import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
// import PlanCard from "../../../components/Plans/PlanCard";
import PlanCard from "../../../components/PlanCard/PlanCard";
import toastifyConfig from "../../../utils/toastify";
import Refetch from "../../../components/Refetch/Refetch";

function Plans() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});

  const handleDelete = async (id) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows[id] = true;
    setLoadingRows(newLoadingRows);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}plan/${id}`
      );
      setPlans((prev) => prev.filter((p) => p._id !== id));
      toast.success(data.message, toastifyConfig);
    } catch (error) {
      toast.error(error.response.data.message, toastifyConfig);
    } finally {
      newLoadingRows[id] = false;
      setLoadingRows(newLoadingRows);
    }
  };
  const getPlans = async () => {
    setError(false);
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
      // do something with the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  if (error) {
    return (
      <Refetch
        handleRetry={getPlans}
        text="We were unable to get the plans at the moment"
      />
    );
  }
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-5 font-bold dark:text-white font-montserrat">
        System Plans
      </h1>
      <div className="flex items-center justify-between  my-2">
        <Link
          to={"create-plan"}
          className="p-3 text-white font-bold bg-red-400 flex items-center space-x-1 rounded-r-md rounded-tl-md font-montserrat"
        >
          <PlusIcon className="h-4 w-4" />
          New Plan
        </Link>
      </div>
      {/* plans div */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="w-full h-full flex flex-col  col-span-3 items-center justify-center font-montserrat">
            <LuLoader2
              size={35}
              className="text-slate-900 dark:text-white animate-spin"
            />
            <p className="text-sm dark:text-white">Fetching plans...</p>
          </div>
        ) : (
          plans?.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              handleDelete={handleDelete}
              loading={loadingRows[plan._id]}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Plans;
