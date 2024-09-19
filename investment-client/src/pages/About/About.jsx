import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services/Services";
import CoinSlider from "../../components/CoinSlider/CoinSlider";
import AboutHero from "../../components/AboutHero/AboutHero";
import Intro from "../../components/Intro/Intro";
import Statistics from "../../components/Statistics/Statistics";
import ContactUs from "../../components/ContactUs/ContactUs";
import Team from "../../components/Team/Team";
import Sponsors from "../../components/Sponsors/Sponsors";
function About() {
  console.log("check");
  return (
    <>
      <Navbar />
      <AboutHero title={"about"} />
      <Intro />
      <Statistics />
      <Services />
      <ContactUs />
      <Team />
      <Sponsors />
      <Footer />
      {/* <CoinSlider /> */}
    </>
  );
}

export default About;
