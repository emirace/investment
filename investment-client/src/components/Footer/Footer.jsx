import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-800 min-h-[40vh] flex flex-col items-center font-montserrat">
      <p className="text-white text-lg md:text-2xl font-bold mt-10 mb-5 text-center">
        Over 300,000 EGP has been invested with XWIN
      </p>
      <button className="p-2 rounded-md bg-red-400 text-white font-bold w-[150px] hover:bg-transparent border-white hover:border">
        Get Started
      </button>
      <div className="grid px-4 py-4 md:py-10 md:grid-cols-3 gap-8 border-t border-b border-white w-full  md:w-[80%] my-7">
        <div>
          <h3 className="text-red-400 mb-4">The founders</h3>
          <p className="text-white text-sm">
            Founded and managed by leading industry professionals DeChoiceXpress
            was established with a clear vision.
          </p>
          <div className=" flex gap-2 items-center">
            <FaWhatsapp color="white" className="bg-green-400 rounded-full" />
            <div className="text-white"> 01150534320</div>
          </div>
        </div>
        <div>
          <h3 className="text-red-400 mb-4">Our Vision</h3>
          <p className="text-white text-sm">
            To provide unrivaled trading solutions to investors from all over
            the world with a stellar client centered culture.
          </p>
        </div>
        <div>
          <h3 className="text-red-400 mb-4">Quick Links</h3>
          <ul className="text-white text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Investment Plans</li>
            <li>Academy</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <p className="text-white text-center text-xs md:text-lg">
          Copyright © 2023 XWIN. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
