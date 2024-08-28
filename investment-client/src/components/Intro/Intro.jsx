import img from "/images/pexels-rodnae-productions-8370752.jpg";

function Intro() {
  return (
    <div className="font-montserrat py-7">
      <div className="grid md:grid-cols-2 gap-8 mx-auto p-4 w-full md:w-[80%]">
        {/* text div */}
        <div>
          <h2 className="font-bold text-slate-900 text-lg text-center md:text-xl 2xl:text-4xl mb-7">
            About XWIN.com
          </h2>
          <p className="mb-5">
            xwin.com is an investment company offering blockchain-based assets
            such as cryptocurrencies, as well as Forex, Stocks, and Exchange
            Traded Funds to its clients, who include individual, group, and
            institutional investors. xwin.com is licensed to trade digital
            assets to clients in over 147 countries around the world. Our
            offered assets bring high returns for our clients, who have trusted
            us for over 6 years now.
          </p>
          <p className="mb-5">
            As a company, we are committed to ensuring our clients are satisfied
            and get the best out of their investments. Our platform is a secure,
            robust, and easy-to-use interface that allow users easily and
            quickly create an account and start out on a rewarding financial
            journey. We hold a record for excellence and client satisfaction. We
            deliver on our promise and we will always hold our records high.
          </p>
        </div>
        {/* image div */}
        <div>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Intro;
