import { BiMessageRounded, BiSolidMessageRounded } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { IoStatsChart } from "react-icons/io5";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdIosShare,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import { useSupabase } from "../app/context/supabaseContext";
import RepliesComponent from "./repliesComponent";
import Technical from "./technical";

export default function TweetCompinent({ tweet, replies }) {
  const {
    isReplied,
    setIsReplied,
    handleLike,
    handleBookmark,
    openMenuId,
    setOpenMenuId,
    editReplies,
    editId,
    setEditId,
    twitte,
    setTwitte,
  } = useSupabase();

  return (
    <div className="border-b border-twitter-gray p-2 cursor-pointer flex space-x-2">
      <div className="p-2">
        <div className="w-10 h-10 rounded-full bg-gray-800" />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <div className="flex flex-col items-center">
            <div className="flex gap-x-2">
              <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-1 items-center">
                  <a href="" className="hover:underline font-bold">
                    {tweet.profiles.full_name}
                  </a>

                  <span className="text-sm flex gap-x-1 items-center text-twitter-Lightgray">
                    @{tweet.profiles.username}
                    <div className="w-1 h-1 rounded-full bg-twitter-Lightgray"></div>
                    <span className="hover:underline">
                      {new Date(tweet.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                </div>
                <p className="text-sm">{tweet.text}</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit h-fit">
              <img src="/grok-white.svg" alt="" className="w-4 h-4" />
            </div>
            <div className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit h-fit">
              <MdOutlineMoreHoriz />
            </div>
          </div>
        </div>
        <div className="mr-2 w-[518px] border border-twitter-gray rounded-xl">
          <img src="/X-white.png" alt="" />
        </div>
        <div className="flex gap-x-1 mt-2 items-center">
          <span className="text-[0.75rem] text-twitter-Lightgray">From</span>
          <h4 className="text-[0.8rem] font-bold">gsdfgdfgvsdghfv</h4>
        </div>
        <div className="flex justify-between mt-2">
          <div
            onClick={() => setIsReplied(!isReplied)}
            className="group flex items-center space-x-1 hover:text-sky-500 cursor-pointer"
          >
            <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition">
              {tweet.is_replied?.length > 0 ? (
                <BiSolidMessageRounded className="text-sky-500/10" />
              ) : (
                <BiMessageRounded />
              )}
            </div>
            <span className="text-sm -ml-2">{tweet.replies_count}</span>
          </div>
          <div className="group flex items-center space-x-1 hover:text-[#00BA7C] cursor-pointer">
            <div className="p-2 rounded-full group-hover:bg-[#071A14] transition">
              <HiMiniArrowPathRoundedSquare />
            </div>
            <span className="text-sm -ml-2">6.9K</span>
          </div>
          <div
            onClick={() => handleLike(tweet.id)}
            className="group flex items-center space-x-1 hover:text-[#F91880] cursor-pointer"
          >
            <div className="p-2 rounded-full group-hover:bg-[#200914] transition">
              {tweet.is_liked?.length > 0 ? (
                <MdFavorite className="text-[#F91880]" />
              ) : (
                <MdFavoriteBorder />
              )}
            </div>
            <span className="text-sm -ml-2">{tweet.likes_count}</span>
          </div>
          <div className="group flex items-center space-x-1 hover:text-sky-500 cursor-pointer">
            <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition">
              <IoStatsChart />
            </div>
            <span className="text-sm -ml-2">6.9K</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleBookmark(tweet.id)}
              className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit"
            >
              {tweet.is_bookmarked ? <FaBookmark /> : <CiBookmark />}
            </button>
            <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
              <MdIosShare />
            </button>
          </div>
        </div>
      </div>
      {isReplied && (
        <div
          className={`bg-twitter-black/50 fixed w-full h-full top-0 bottom-0 left-0 right-0 ${
            isReplied === true ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <div
            onClick={() => setOpenMenuId(null)}
            className="flex flex-col p-4 space-y-4 bg-twitter-black h-[90%]"
          >
            <RepliesComponent tweet={tweet} />
            <div className="p-4 overflow-scroll">
              {replies.map((reply) => (
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
                  {editId === reply.id ? (
                    <div className="flex flex-col space-y-2 w-full">
                      <textarea
                        onChange={(e) => setTwitte(e.target.value)}
                        value={twitte}
                        name="post"
                        id="post"
                        placeholder="What's happening?"
                        className="text-[1.35rem] font-extralight w-full focus:outline-none"
                      ></textarea>
                      <div className="flex gap-x-4 items-center">
                        <button
                          onClick={() => {
                            editReplies(reply.id, twitte, tweet.id);
                            setEditId(null);
                            setTwitte("");
                          }}
                          className="px-2 py-1 bg-white text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-2 py-1 bg-white text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-twitter-white">{reply.text}</p>
                      <MdOutlineMoreHoriz
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === reply.id ? null : reply.id
                          );
                        }}
                        className="text-2xl"
                      />
                      {openMenuId === reply.id && (
                        <Technical repliesId={reply.id} tweetId={tweet.id} />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
