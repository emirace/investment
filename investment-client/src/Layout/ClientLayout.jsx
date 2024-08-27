/* eslint-disable valid-typeof */
import { useEffect, useState, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CircleStackIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth";
import { FaUsers } from "react-icons/fa";

function ClientLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  useEffect(() => {
    handleResize();
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  const clientLinks = [
    {
      link: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      to: "/dashboard",
    },
    {
      link: "Deposit",
      icon: <ArrowDownTrayIcon className="h-5 w-5" />,
      to: "/dashboard/deposit",
    },
    {
      link: "Referral",
      icon: <FaUsers className="h-5 w-5" />,
      to: "/dashboard/referral",
    },
    {
      link: "Withdraw",
      icon: <ArrowUpTrayIcon className="h-5 w-5" />,
      to: "/dashboard/withdrawal",
    },
    {
      link: "Invest Funds",
      icon: <CircleStackIcon className="h-5 w-5" />,
      to: "/dashboard/buy-plan",
    },
    {
      link: "Transactions",
      icon: <CreditCardIcon className="h-5 w-5" />,
      to: "/dashboard/transactions",
    },
    {
      link: "Profile",
      icon: <IdentificationIcon className="h-5 w-5" />,
      to: "/dashboard/profile",
    },
  ];
  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-900 pb-10">
      <Topbar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar showNav={showNav} navigationLinks={clientLinks} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ClientLayout;
