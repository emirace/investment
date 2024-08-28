import { GiProgression, GiJetFighter } from "react-icons/gi";
import { BsEaselFill } from "react-icons/bs";
import ServiceCard from "./ServiceCard";

const services = [
  {
    header: "identify assets",
    description:
      "We identify high potential assets using our intelligent financial markets systems, combined with expert advice.",
    icon: (
      <GiProgression className="text-red-400 text-6xl group-hover:text-white" />
    ),
  },
  {
    header: "analyze risks",
    description:
      "We carry out risk-reward analysis to determine the risk exposure for each asset we select.",
    icon: (
      <GiJetFighter className="text-red-400 text-6xl group-hover:text-white" />
    ),
  },
  {
    header: "manage portfolio",
    description:
      "We create and manage client portfolio using artificial intelligence and expert investment managers.",
    icon: (
      <BsEaselFill className="text-red-400 text-6xl group-hover:text-white" />
    ),
  },
];

function Services() {
  return (
    <div className="font-montserrat flex flex-col items-center mt-7">
      <h3 className="text-red-400  text-xs md:text-lg">Welcome To XWIN</h3>
      <h2 className="font-bold text-xl md:text-6xl">What we do</h2>
      {/* little line */}
      <div className="w-[50px] md:w-[100px] h-[2px] bg-red-400 mt-4" />
      {/* paragraph */}
      <p className="p-4 text-xs md:text-lg text-center w-full md:w-[40%]">
        We are an investment company, using blockchain technology to drive
        secure and profitable investments and manage portfolios for our clients.
        We take our client&apos;s financial dreams and make them a reality.
      </p>

      <div className="grid md:grid-cols-3 gap-8 w-full md:w-[80%] p-4 mt-7">
        {services.map((service, index) => (
          <ServiceCard
            key={service.header}
            header={service.header}
            description={service.description}
            icon={service.icon}
            number={"O" + (index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
