// src/components/Referral.tsx

import React, { useEffect, useState } from "react";
import { FaFacebook, FaRegCopy, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { useAuth } from "../../../hooks/useAuth";
import { LuLoader2, LuShare2 } from "react-icons/lu";
import axios from "axios";

const Referral = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);
  const [errorReferrals, setErrorReferrals] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoadingReferrals(true);
        setErrorReferrals("");

        const { data } = await axios.get(
          `${import.meta.env.VITE_GENERAL_API_ENDPOINT}users/my-referrals`,
          { referralCode: code },
          { withCredentials: true }
        );
        setReferrals(data.referrals);
      } catch (error) {
        setErrorReferrals("Failed to fetch referrals");
      } finally {
        setLoadingReferrals(false);
      }
    };

    fetchReferrals();
  }, []);

  const shareText = `Join me and get rewards using my referral code: ${user?.referralCode}`;
  const website = "";
  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      website // Replace with your site URL
    )}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookShareUrl, "_blank");
  };

  // Share on Telegram
  const shareOnTelegram = () => {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      website // Replace with your site URL
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramShareUrl, "_blank");
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + website // Replace with your site URL
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(website)}`; // Replace with your site URL
    window.open(twitterShareUrl, "_blank");
  };

  // Generic share (for mobile devices with Web Share API)
  const genericShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join and Earn Rewards!",
          text: shareText,
          url: website, // Replace with your site URL
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const handleAddRefferer = async () => {
    if (!code) {
      setError("Enter referral code");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}users/add-referral`,
        { referralCode: code },
        { withCredentials: true }
      );
      setUser((prev) => ({ ...prev, referral: data.referrerId }));
      alert("Referral added successfully");
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="p-6 h-full w-full max-w-2xl  mb-16 bg-white min-h-[256px] shadow-sm dark:bg-slate-800 text-gray-700 dark:text-white">
        <div className="flex items-center mb-8 gap-5">
          <h1 className="text-3xl font-bold  text-center">Refer & Earn</h1>
        </div>
        <p className="font-medium text-xl ">Referral And Earn</p>
        <p className=" mb-6">Copy your code, share it with your friends</p>
        <div className="border  rounded-full p-4 flex justify-between items-center">
          <span className="uppercase">{user?.referralCode}</span>
          <FaRegCopy
            className=" cursor-pointer"
            onClick={() =>
              navigator.clipboard.writeText(user?.referralCode || "")
            }
            size={24}
          />
        </div>
        <div className="py-6 text-center">Or</div>
        <div className="flex justify-around items-center mb-4 ">
          <button
            className="border  rounded-full p-3 mx-1"
            onClick={shareOnFacebook}
          >
            <FaFacebook
              className="text-blue-600 bg-white rounded-full"
              size={28}
            />
          </button>
          <button
            className="border  rounded-full p-3 mx-1"
            onClick={shareOnTelegram}
          >
            <FaTelegram
              className="text-blue-400 bg-white rounded-full"
              size={28}
            />
          </button>
          <button
            className="border  rounded-full p-3 mx-1"
            onClick={shareOnWhatsApp}
          >
            <IoLogoWhatsapp className="text-green-400" size={28} />
          </button>
          <button
            className="border  rounded-full p-3 mx-1"
            onClick={shareOnTwitter}
          >
            <FaXTwitter size={28} />
          </button>
          <button
            className="border  rounded-full p-3 mx-1"
            onClick={genericShare}
          >
            <LuShare2 size={28} />
          </button>
        </div>

        <div className="my-10 border p-6 rounded-lg">
          <div className="font-medium text-lg mb-2">Refferal Rules</div>
          After friend successfully deposit and invest you will get a commission
          of 10% of their investment, it can be use for investment at any time
        </div>

        {!user?.invitedBy && (
          <>
            {" "}
            <p className="font-medium text-xl mt-6 mb-4 ">Invitation Code</p>
            <div className="flex items-center rounded-full border py-1 px-2 pl-4">
              <input
                type="text"
                placeholder="Enter Refer Code"
                className="w-full bg-transparent outline-none"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button
                onClick={handleAddRefferer}
                className=" bg-red-400 text-white  rounded-full p-2"
              >
                {loading ? (
                  <ImSpinner9 size={28} className={"animate-spin"} />
                ) : (
                  <IoMdArrowForward size={28} />
                )}
              </button>
            </div>
            {error && <div className="text-xs text-red-500">{error}</div>}
          </>
        )}

        <p id="teams" className="font-medium text-xl mt-6 mb-4 ">
          My Referral bonus
        </p>

        <div className="border rounded-lg p-4  shadow-md">
          {loadingReferrals ? (
            <LuLoader2 size={24} className=" animate-spin" />
          ) : errorReferrals ? (
            <p>{errorReferrals}</p>
          ) : referrals.length > 0 ? (
            <ul className="space-y-4">
              {referrals.map((referral) => (
                <li
                  key={referral.username}
                  className="flex justify-between items-center border-b border-gray-600 pb-2"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-400">{referral.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No referrals bonus.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referral;
