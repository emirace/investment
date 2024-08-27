/* eslint-disable react/prop-types */
import { BsBriefcase } from "react-icons/bs";
function PlanCard({ plan }) {
  return (
    <div className="font-montserrat border border-black/40">
      <div className="bg-gray-500 text-white flex items-center justify-center p-3 uppercase font-bold">
        {plan.name}
      </div>
      <div className="bg-gray-200 relative flex flex-col space-y-4 py-7 items-center justify-center">
        <span className="text-gray-500">{plan.roi}</span>
        <span className="font-bold text-black">ROI</span>
        <div className="absolute w-[50px] h-[50px] flex items-center justify-center rounded-full bg-red-400 right-1/2 bottom-0 translate-x-1/2 translate-y-1/2">
          <BsBriefcase className="text-white" />
        </div>
      </div>
      <div className="border-b border-black/40 flex justify-center">
        <p className="mt-10">{plan.dailyPercentage}% Daily</p>
      </div>
      <div className="border-b border-black/40 p-4 flex items-center justify-center">
        <span>Minimum: {plan.minimum}</span>
      </div>
      <div className="border-b border-black/40 p-4 flex items-center justify-center">
        <span>Maximum: {plan.maximum}</span>
      </div>
      <div className="border-b border-black/40 p-4 flex items-center justify-center">
        <span>Plan Duration: {plan.duration} Days</span>
      </div>
      <div className="p-4 flex flex-col space-y-7 items-center justify-center">
        {/* <span>Profits accessible after {plan.duration} days</span> */}
        <div>
          <button className="text-white font-bold p-4 bg-slate-800">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
