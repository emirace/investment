import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CoinSlider from "../../components/CoinSlider/CoinSlider";
import ContactUs from "../../components/ContactUs/ContactUs";
import Sponsors from "../../components/Sponsors/Sponsors";
import AboutHero from "../../components/AboutHero/AboutHero";
import SecurityDetails from "../../components/SecurityDetails/SecurityDetails";

function Security() {
  return (
    <>
      <AboutHero title={"security"} />
      <Navbar />
      <SecurityDetails />
      {/* <CoinSlider /> */}
      <ContactUs />
      <Sponsors />
      <Footer />
    </>
  );
}

export default Security;
