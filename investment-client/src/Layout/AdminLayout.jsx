/* eslint-disable valid-typeof */
import { useEffect, Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Transition } from "@headlessui/react";
import {
  HomeIcon,
  UserIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth";

const adminLinks = [
  {
    link: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    to: "/dashboard",
  },
  {
    link: "Manage Users",
    icon: <UserIcon className="h-5 w-5" />,
    to: "users",
  },
  {
    link: "Manage Deposits",
    icon: <ArrowDownTrayIcon className="h-5 w-5" />,
    to: "deposits",
  },
  {
    link: "Deposit Numbers",
    icon: <ArrowDownTrayIcon className="h-5 w-5" />,
    to: "/dashboard/numbers",
  },
  {
    link: "Investments",
    icon: <CircleStackIcon className="h-5 w-5" />,
    to: "plans",
  },
  {
    link: "Manage Withdrawals",
    icon: <ArrowUpTrayIcon className="h-5 w-5" />,
    to: "withdrawals",
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNav, setShowNav] = useState(false);
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

  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-900 ">
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
        <Sidebar showNav={showNav} navigationLinks={adminLinks} />
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

export default AdminLayout;
