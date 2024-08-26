import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PlanForm from "../../../components/PlanForm/PlanForm";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../../utils/toastify";

function CreatePlan() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    console.log("form has been submitted", formData);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}plan`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message, toastifyConfig);
      navigate("/dashboard/plans");
    } catch (error) {
      toast.error(error.response.data.message, toastifyConfig);
    } finally {
      setLoading(false);
    }
  };
  const initialValues = {
    name: "",
    minimumPrice: "",
    maximumPrice: "",
    duration: "",
    topUpInterval: "",
    giftBonus: "",
    topUpAmount: "",
  };

  return (
    <>
      <div className="flex items-center justify-between mb-16 font-montserrat">
        <h1 className="text-gray-700 text-3xl  font-bold dark:text-white">
          Add Investment plan
        </h1>
        <Link
          to={"/dashboard/plans"}
          className="flex  items-center space-x-1 text-white capitalize bg-red-400 px-3 py-2 rounded-md"
        >
          <ArrowLeftIcon className="h-4 w-4 text-white" />
          back
        </Link>
      </div>

      <div className="shadow-md bg-white dark:bg-slate-800 p-4">
        <PlanForm
          onSubmit={handleSubmit}
          initialData={initialValues}
          loading={loading}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default CreatePlan;
