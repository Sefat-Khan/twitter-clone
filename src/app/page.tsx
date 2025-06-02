"use client";

import LeftNavBar from "../components/leftNavBar";
import MainArea from "../components/mainArea";
import RightSideBar from "../components/rightSideBar";

export default function Home() {
  return (
    <div className="bg-black text-white flex justify-center items-center">
      <div className="w-[1400px] h-full flex relative">
        <LeftNavBar />
        <MainArea />
        <RightSideBar />
      </div>
    </div>
  );
}
