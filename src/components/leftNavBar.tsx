"use client";

import { useState } from "react";
import { AiFillThunderbolt, AiOutlineThunderbolt } from "react-icons/ai";
import { BsPeople, BsPeopleFill, BsTwitterX } from "react-icons/bs";
import { CgMoreO, CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { MdEmail, MdOutlineEmail, MdOutlineMoreHoriz } from "react-icons/md";
import { RiNotificationFill, RiNotificationLine } from "react-icons/ri";
import { useSupabase } from "../app/context/supabaseContext";
import { Button } from "./ui/button";

export default function LeftNavBar() {
  const [active, setActive] = useState("Home");
  const { userData } = useSupabase();
  const [isProfileShow, setIsProfileShow] = useState(false);
  const navList = [
    {
      title: "Home",
      icons: <GoHome />,
      fill: <GoHomeFill />,
      hasNotification: true,
    },
    {
      title: "Explore",
      icons: <GoSearch />,
      fill: <FaSearch />,
    },
    {
      title: "Notifications",
      icons: <RiNotificationLine />,
      fill: <RiNotificationFill />,
      hasNotification: true,
    },
    {
      title: "Messages",
      icons: <MdOutlineEmail />,
      fill: <MdEmail />,
      hasNotification: true,
    },
    {
      title: "Grok",
      icons: <img src="/grok-white.svg" alt="Grok" className="w-8 h-8" />,
      fill: (
        <img
          src="/grok-black.svg"
          alt="Grok"
          className="w-8 h-8 bg-white p-2"
        />
      ),
    },
    {
      title: "Communities",
      icons: <BsPeople />,
      fill: <BsPeopleFill />,
    },
    {
      title: "Premium",
      icons: <BsTwitterX />,
      fill: <BsTwitterX className="text-black bg-white p-2" />,
    },
    {
      title: "Verified Orgs",
      icons: <AiOutlineThunderbolt />,
      fill: <AiFillThunderbolt />,
    },
    {
      title: "Profile",
      icons: <img src="/profile.png" alt="Grok" className="w-8 h-8" />,
      fill: <CgProfile />,
    },
    {
      title: "More",
      icons: <CgMoreO />,
      fill: <CgMoreO className="text-black bg-white p-2" />,
    },
  ];

  return (
    <section className="md:flex flex-col w-[70px] xl:w-[250px] h-screen sticky top-0 pl-2 xl:pl-18 pr-1 justify-between">
      <nav className="flex flex-col gap-y-4">
        <div className="text-3xl w-fit hover:bg-gray-800 rounded-full p-3">
          <BsTwitterX className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-y-2">
          {navList.map((item) => (
            <button
              onClick={() => setActive(item.title)}
              key={item.title}
              className={`relative flex gap-x-4 hover:bg-[#181818] rounded-full h-12 items-center pl-2 pr-6 w-fit xl:w-full cursor-pointer ${
                active === item.title ? "font-bold" : ""
              }`}
            >
              <span className="text-3xl">
                {active !== item.title && item.fill ? item.icons : item.fill}
              </span>
              <span className="hidden xl:inline">
                {item.hasNotification && (
                  <div className="w-2 h-2 rounded-full bg-sky-500 absolute top-2 left-8"></div>
                )}
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <Button className="hidden xl:flex px-12 py-3 cursor-pointer mr-8 text-lg rounded-full font-bold">
          Post
        </Button>
        <Button className="xl:hidden flex justify-center items-center p-3 cursor-pointer text-lg rounded-full font-bold">
          <BsTwitterX className="text-xl" />
        </Button>
      </nav>
      {userData && (
        <div className="flex justify-between items-center px-2 py-1 rounded-full hover:bg-[#181818] w-full h-16 mb-3 cursor-pointer">
          <div className="flex justify-start gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="hidden xl:block">
              <h3>{userData.full_name}</h3>
              <p className="text-sm font-medium text-gray-500">
                {userData.username}
              </p>
            </div>
          </div>
          <MdOutlineMoreHoriz className="hidden xl:block text-gray-500 text-2xl hover:text-gray-300 transition duration-75" />
        </div>
      )}
    </section>
  );
}
