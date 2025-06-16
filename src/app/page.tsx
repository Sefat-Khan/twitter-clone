"use client";

import { GoHome, GoSearch } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import LeftNavBar from "../components/leftNavBar";
import MainArea from "../components/mainArea";
import RightSideBar from "../components/rightSideBar";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="w-full sm:max-w-[500px] xl:max-w-[1400px] mx-auto flex">
        {/* Left Navigation - Hidden on mobile, shown on md screens */}
        <div className="hidden md:block flex-shrink-0">
          <LeftNavBar />
        </div>

        {/* Main Content Area - Full width on mobile, constrained on larger screens */}

        <MainArea />

        {/* Right Sidebar - Hidden on mobile and lg screens, shown on xl screens */}
        <div className="hidden lg:block flex-shrink-0">
          <RightSideBar />
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only shown on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-twitter-gray flex justify-around py-3 z-50">
        <button className="p-2">
          <GoHome className="text-2xl" />
        </button>
        <button className="p-2">
          <GoSearch className="text-2xl" />
        </button>
        <button className="p-2">
          <RiNotificationLine className="text-2xl" />
        </button>
        <button className="p-2">
          <MdOutlineEmail className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
