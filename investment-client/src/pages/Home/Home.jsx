import "./Home.css";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Onboarding from "../../components/Onboarding/Onboarding";
import GotYou from "../../components/Gotyou/GotYou";
import Statistics from "../../components/Statistics/Statistics";
import Testimonial from "../../components/Testimonial/Testimonial";
import CoinTable from "../../components/CoinTable/CoinTable";
import Sponsors from "../../components/Sponsors/Sponsors";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CoinSlider from "../../components/CoinSlider/CoinSlider";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <section className="py-5"> */}
      <Services />
      <GotYou />
      <Onboarding />
      <Statistics />
      <Testimonial />
      {/* <CoinTable /> */}
      <Sponsors />
      {/* <CoinSlider /> */}
      <Footer />
      {/* </section> */}
    </>
  );
}

export default Home;
{
  /* <div className="card flex flex-col items-center border-solid border-2 border-white rounded p-4">
<div>
  <img src={forexImg} alt="" className="min-w-full" />
</div>
<div>
  <h2 className="font-bold text-2xl py-3">Forex/Crypto Plan</h2>
</div>
<hr />
<div className="py-4">
  <p className="text-lg">Min: $1000|Max: $10000000</p>{" "}
</div>

<div className="py-4">
  <p> ROI: 5% | Days: 7 days</p>
</div>
<div className="py-4">
  <p> Daily Rate: 0.71%</p>
</div>
</div> */
}
