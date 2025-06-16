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
    setTwitte,
  } = useSupabase();

  return (
    <div className="w-full md:max-w-[600px] h-fit border-x border-twitter-gray relative">
      {/* Header */}
      <div className="flex justify-between sticky top-0 z-10 bg-black/80 backdrop-blur-sm">
        <button className="w-1/2 py-4 relative hover:bg-twitter-darkBrown cursor-pointer text-twitter-Lightgray font-bold">
          <span className="relative">
            For You
            <div className="w-16 bg-sky-500 h-1 rounded-full absolute bottom-[-12px] left-1/2 transform -translate-x-1/2"></div>
          </span>
        </button>
        <button className="w-1/2 py-4 relative hover:bg-twitter-darkBrown cursor-pointer text-twitter-Lightgray font-bold">
          Following
        </button>
      </div>

      {/* Tweet Composer */}
      <div className="border-b border-twitter-gray">
        <div className="flex gap-x-2 px-4 pt-4">
          <img
            src="/X-white.png"
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <div className="flex-1 pb-2">
            <textarea
              onClick={() => setFocus(true)}
              onChange={(e) => setTwitte(e.target.value)}
              value={twitte}
              name="post"
              id="post"
              placeholder="What's happening?"
              className="text-[1.1rem] sm:text-[1.35rem] bg-transparent font-extralight w-full focus:outline-none resize-none placeholder-twitter-Lightgray/80"
              rows={focus ? 3 : 1}
            ></textarea>
            {focus && (
              <span className="text-sky-500 w-fit cursor-pointer font-bold flex items-center hover:bg-[#031018] px-3.5 py-1 rounded-full text-sm sm:text-base">
                <FaGlobeAmericas className="mr-1" /> Everyone can reply
              </span>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-12">
          <hr className="w-full border-twitter-gray" />
          <div className="py-3 flex justify-between items-center">
            <div className="flex flex-wrap gap-x-1">
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <CiImageOn className="text-twitter-blue text-lg sm:text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <HiOutlineGif className="text-twitter-blue text-lg sm:text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <img
                  src="/grok-blue.svg"
                  alt="Grok"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <RiListRadio className="text-twitter-blue text-lg sm:text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <BsEmojiSmile className="text-twitter-blue text-lg sm:text-xl" />
              </button>
              <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                <TbCalendarTime className="text-twitter-blue text-lg sm:text-xl" />
              </button>
              <button disabled className="p-2 rounded-full w-fit">
                <LuMapPin className="text-twitter-blue/50 text-lg sm:text-xl" />
              </button>
            </div>

            <div className="flex gap-x-2 items-center">
              {twitte && twitte.length > 0 && (
                <>
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2F3336"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={`${twitte.length > 80 ? "#aa2020" : "#1D9BF0"}`}
                        strokeWidth="2"
                        strokeDasharray={`${(twitte.length / 80) * 100}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {twitte.length > 80 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[9px] text-red-500 font-bold">
                        {twitte.length}
                      </span>
                    )}
                  </div>
                  <div className="w-[0.086rem] h-6 sm:h-8 bg-twitter-gray"></div>
                </>
              )}

              <Button
                disabled={
                  twitte.length === 0 || twitte.length > 80 || isPosting
                }
                onClick={handlePostTweet}
                className={`${
                  twitte.length === 0 || twitte.length > 80
                    ? "bg-white/50"
                    : "bg-twitter-blue hover:bg-twitter-blue/90"
                } rounded-full px-3 sm:px-4 py-1 h-8 sm:h-auto font-bold text-sm sm:text-base`}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tweets Feed */}
      <div className="flex justify-center items-center border-b border-twitter-gray py-4">
        <a
          href=""
          className="text-sky-500 font-extralight text-sm sm:text-base"
        >
          Show 840 posts
        </a>
      </div>

      {loadingTweets ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-twitter-blue"></div>
        </div>
      ) : (tweets?.length || 0) === 0 ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-twitter-Lightgray">No tweets found</p>
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
