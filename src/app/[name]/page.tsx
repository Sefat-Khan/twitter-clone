"use client";

import LeftNavBar from "@/src/components/leftNavBar";
import RightSideBar from "@/src/components/rightSideBar";
import TweetCompinent from "@/src/components/tweetCompinent";
import { BiCalendar } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import { useSupabase } from "../context/supabaseContext";

export default function ProfilePage() {
  const { loading, userData, tweets, replies, activeTab, setActiveTab } =
    useSupabase();

  console.log(userData);

  const navList = [
    {
      title: "Posts",
    },
    {
      title: "Replies",
    },
    {
      title: "Highlights",
    },
    {
      title: "Articles",
    },
    {
      title: "Media",
    },
    {
      title: "Likes",
    },
  ];

  return (
    <div className="bg-black text-white flex justify-center items-center">
      <div className="w-[1400px] h-full flex relative">
        <LeftNavBar />
        <div className="border-x border-twitter-gray w-[600px] h-full flex flex-col">
          <div className="flex space-x-3 items-center py-4">
            <MdArrowBack />
            <div className="flex flex-col">
              <h2>bfhdsh</h2>
              <p className="text-sm text-twitter-Lightgray">2 post</p>
            </div>
          </div>
          <div>
            <div className="w-full h-[15rem] bg-gray-800" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between px-4">
              <div className="p-2 bg-black">
                <div className="w-34 h-34 rounded-full bg-gray-700 -mt-19" />
              </div>
              <button className="px-4 h-10 mt-4 border border-twitter-white cursor-pointer font-bold rounded-full bg-transparent text-white hover:bg-twitter-Lightgray">
                Edit profile
              </button>
            </div>
            {userData && (
              <div className="flex flex-col space-y-3 px-4">
                <div className="spayce-y-1">
                  <div>
                    <h3 className="text-xl font-bold">{userData.full_name}</h3>
                  </div>
                  <p className="text-sm text-twitter-Lightgray">
                    @{userData.username}
                  </p>
                </div>
                <div className="flex space-x-2 items-center text-twitter-Lightgray font-semibold">
                  <BiCalendar />
                  <span>{userData.updated_at}</span>
                </div>
                <div className="flex space-x-8 items-center text-twitter-Lightgray">
                  <span>
                    <span className="text-twitter-white">0</span> followers
                  </span>
                  <span>
                    <span className="text-twitter-white">0</span> following
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center w-full cursor-pointer border-b border-twitter-Lightgray mt-6">
            {navList.map((item) => (
              <button
                key={item.title}
                onClick={() => setActiveTab(item.title)}
                className="relative w-full bg-twitter-black hover:bg-twitter-darkBrown text-white font-bold py-2 px-3"
              >
                {item.title}
                {activeTab === item.title && (
                  <div className="w-9 h-1 bg-twitter-blue rounded-full absolute bottom-0 left-[30%]" />
                )}
              </button>
            ))}
          </div>
          {activeTab === "Posts" ? (
            loading ? (
              <div className="flex justify-center items-center py-4">
                <p>Loading tweets...</p>
              </div>
            ) : (tweets?.length || 0) === 0 ? (
              <div className="flex justify-center items-center py-4">
                <p>No tweets found</p>
              </div>
            ) : (
              tweets?.map((tweet) => (
                <TweetCompinent
                  key={tweet.id}
                  tweet={tweet}
                  replies={replies.filter(
                    (reply) => reply.tweet_id === tweet.id
                  )}
                />
              ))
            )
          ) : loading ? (
            <div className="flex justify-center items-center py-4">
              <p>Loading tweets...</p>
            </div>
          ) : (replies?.length || 0) === 0 ? (
            <div className="flex justify-center items-center py-4">
              <p>No replies found</p>
            </div>
          ) : (
            replies?.map((reply) => (
              <div key={reply.id} className="relative flex space-x-2 p-3">
                <div className="flex w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-800" />

                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-twitter-white">
                      {reply.profiles?.full_name || "Unknown User"}
                    </h3>
                    <p className="text-twitter-Lightgray">
                      @{reply.profiles?.username || "Unknown"}
                    </p>
                  </div>
                </div>
                <p className="text-twitter-white">{reply.text}</p>
              </div>
            ))
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
}
