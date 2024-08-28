import "./styles.css";
import { CiLocationOn, CiMail } from "react-icons/ci";
import ContactForm from "./ContactForm";
import { FaWhatsapp } from "react-icons/fa";
function ContactUs() {
  return (
    <div className="min-h-screen 2xl:min-h-[80vh] contact relative font-montserrat text-white">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/80 "></div>
      <div className="flex flex-col items-start relative z-[19] w-[80%] mx-auto">
        <h2 className="font-bold text-3xl mt-8">Contact us at anytime</h2>
        <div className="w-[50px] md:w-[100px] h-[2px] bg-red-400 my-4" />
        <p className="mb-7 md:w-[50%]">
          Feel free to contact us for any questions regarding our services or
          your finances. Our Customer Support is 24/7 and very friendly.
        </p>
        {/* <div className="py-7 border-t border-b border-white/80 flex space-x-3 md:w-[50%]">
          <CiLocationOn className="text-white" />
          <div>
            <span className="font-bold">LOCATION </span>
            <p className="text-sm">
              Bentinck House, 3-8 Bolsover Street, London,{" "}
            </p>
            <p className="text-sm">England, W1W 6AB</p>
          </div>
        </div> */}

        <div className="py-7  flex space-x-3 md:w-[50%]">
          <CiMail className="text-white" />
          <div>
            <span className="font-bold">EMAIL </span>
            <p className="text-sm">XWIN@gmail.com</p>
          </div>
        </div>
        <div className="py-7  flex space-x-3 md:w-[50%]">
          <FaWhatsapp className="text-white" />
          <div>
            <span className="font-bold">PHONE </span>

            <div className="text-white"> 01150534320</div>
          </div>
        </div>
        {/* form div */}
        <div className="md:w-[50%]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
