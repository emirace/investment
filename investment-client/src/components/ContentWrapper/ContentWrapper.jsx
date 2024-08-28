/* eslint-disable react/prop-types */

function ContentWrapper({ icon, text, number, iconBgColor, isMoney }) {
  return (
    <div className="rounded bg-white flex md:flex-col space-x-5 md:space-x-0 items-center justify-center md:items-start  h-40 shadow-sm space-y-2 p-4 dark:bg-slate-800 font-montserrat">
      <div className={`${iconBgColor} rounded-full p-2 w-fit`}>{icon}</div>
      <div className="flex-1 ">
        <p className="text-gray-400 dark:text-white text-sm">{text}</p>

        <p className="text-3xl text-gray-700 font-bold dark:text-white">
          {isMoney ? `${number}EGP` : `${number}`}
        </p>
      </div>
    </div>
  );
}

export default ContentWrapper;
