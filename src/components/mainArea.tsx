import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FaGlobeAmericas } from "react-icons/fa";
import { HiOutlineGif } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { RiListRadio } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { useSupabase } from "../app/context/supabaseContext";
import TweetCompinent from "./tweetCompinent";
import { Button } from "./ui/button";

export default function MainArea() {
  const {
    tweets,
    replies,
    loadingTweets,
    isPosting,
    error,
    twitte,
    handlePostTweet,
    focus,
    setFocus,
  } = useSupabase();

  return (
    <div className="w-[600px] h-fit border-x border-twitter-gray relative">
      <div className="flex justify-between sticky top-0.5 bg-black">
        <button className="w-1/2 py-3 relative border-y border-twitter-gray hover:bg-twitter-darkBrown cursor-pointer text-twitter-Lightgray">
          For You
          <div className="w-16 bg-sky-500 h-1 rounded-full absolute bottom-0.5 left-[6.8rem]"></div>
        </button>
        <button className="w-1/2 py-3 relative border-y border-twitter-gray hover:bg-twitter-darkBrown cursor-pointer text-twitter-Lightgray">
          Following
        </button>
      </div>
      <div className="border-b border-twitter-gray">
        <div className="flex gap-x-2 px-2 pt-4">
          <img src="/X-white.png" alt="" className="w-12 h-12 rounded-full" />
          <div className="pb-2">
            <textarea
              onClick={() => setFocus(true)}
              onChange={(e) => setTwitte(e.target.value)}
              value={twitte}
              name="post"
              id="post"
              placeholder="What's happening?"
              className="text-[1.35rem] font-extralight w-full focus:outline-none"
            ></textarea>
            {focus && (
              <span className="text-sky-500 w-fit cursor-pointer font-bold flex items-center hover:bg-[#031018] px-3.5 py-1 rounded-full">
                <FaGlobeAmericas className="mr-1" /> Everyone can reply
              </span>
            )}
          </div>
        </div>
        <div className="px-12">
          <hr className="w-full text-twitter-gray" />
          <div className="py-4 flex justify-between">
            <div className="flex space-x-1">
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <CiImageOn className="text-twitter-blue text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <HiOutlineGif className="text-twitter-blue text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <img src="/grok-blue.svg" alt="Grok" className="w-5 h-5" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <RiListRadio className="text-twitter-blue text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <BsEmojiSmile className="text-twitter-blue text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <TbCalendarTime className="text-twitter-blue text-xl" />
              </button>
              <button disabled className="p-2 rounded-full w-fit">
                <LuMapPin className="text-twitter-blue/50 text-xl" />
              </button>
            </div>
            <div className="flex gap-x-2 items-center">
              {twitte && twitte.length > 0 ? (
                <div className="flex gap-x-2 items-center">
                  <div className="relative w-6 h-6">
                    <svg className="w-6 h-6" viewBox="0 0 36 36">
                      {/* Background Circle */}
                      <path
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2F3336" // Twitter's gray border
                        strokeWidth="2"
                      />
                      {/* Progress Circle (dynamic) */}
                      <path
                        d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={`${twitte.length > 80 ? "#aa2020" : "#1D9BF0"}`} // Twitter blue
                        strokeWidth="2"
                        strokeDasharray={`${(twitte.length / 80) * 100}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Character Count (if approaching limit) */}
                    {twitte.length > 80 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] text-red-500 font-bold">
                        {twitte.length}
                      </span>
                    )}
                  </div>
                  <div className="w-[0.086rem] h-8 bg-twitter-gray"></div>
                  <div className="w-[1.65rem] h-[1.65rem] flex justify-center items-center cursor-pointer rounded-full text-sky-500 text-2xl border border-twitter-gray">
                    <span>+</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              {error && (
                <div className="text-red-500 text-sm mt-2 px-4">{error}</div>
              )}

              <Button
                disabled={
                  twitte.length === 0 || twitte.length > 80 || isPosting
                }
                onClick={handlePostTweet}
                className={`${
                  twitte.length === 0 || twitte.length > 80
                    ? "bg-white/50"
                    : "cursor-pointer"
                } rounded-full px-4 py-1 font-bold `}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-b border-twitter-gray py-4">
        <a href="" className="text-sky-500 font-extralight">
          Show 840 posts
        </a>
      </div>
      {loadingTweets ? (
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
            replies={replies.filter((reply) => reply.tweet_id === tweet.id)}
          />
        ))
      )}
    </div>
  );
}
