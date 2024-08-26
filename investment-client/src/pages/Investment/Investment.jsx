import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CoinSlider from "../../components/CoinSlider/CoinSlider";
import Sponsors from "../../components/Sponsors/Sponsors";
import AboutHero from "../../components/AboutHero/AboutHero";
import PricingDetails from "../../components/PricingDetails/PricingDetails";
import Plans from "../../components/Plans/Plans";

function Investment() {
  return (
    <>
      <Navbar />
      <AboutHero title="Pricing Plans" />
      <PricingDetails />
      <Plans />
      <Sponsors />
      <Footer />
      {/* <CoinSlider /> */}
    </>
  );
}

export default Investment;
