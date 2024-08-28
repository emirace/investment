import chart from "/images/pexels-tima-miroshnichenko-7567522.jpg";
function GotYou() {
  return (
    <div className="bg-slate-100 my-7 py-16 font-montserrat">
      <div className="grid lg:grid-cols-2 gap-8 p-4  w-full md:w-[80%] mx-auto">
        {/* text div */}
        <div>
          <h1 className="font-bold text-2xl lg:text-5xl">
            We&apos;ve got you covered
          </h1>
          <p className="mt-7 text-sm md:text-lg">
            “
            <span className="font-bold">
              Frontier in the fintech space, we have shown the way others now
              follow.
            </span>
            ” and have maintained the status of &apos;first&apos; in many
            dimensions of the investment space.
          </p>
          <p className="mt-2 text-sm md:text-lg">
            miningfx.com is a blockchain-based investment company created to
            help the average person reach her/his finanical dream.
          </p>
          <div className="border-l border-red-400 my-4 ">
            <div className="ms-4">
              <span>&quot;</span>
              <p className="text-sm md:text-lg">
                At XWINfx.com, we take resposibility for investor&apos;s success
                and portfolio performance
              </p>
              <span className="text-red-400">Founder</span>
            </div>
          </div>
          <p className="text-sm md:text-lg">
            universalcapitalfx.com builds and manages portfolios tailored to the
            investor&apos;s financial needs, and deploys technology with
            expertise to ensure these finanical goals are met.
          </p>
        </div>
        {/* image div */}
        <div>
          <img src={chart} alt="assist" />
        </div>
      </div>
    </div>
  );
}

export default GotYou;
