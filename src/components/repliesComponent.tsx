import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";
import { RiListRadio } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbCalendarTime } from "react-icons/tb";
import { useSupabase } from "../app/context/supabaseContext";
import { Button } from "./ui/button";

export default function RepliesComponent({ tweet }) {
  const {
    twitte,
    setTwitte,
    error,
    isPosting,
    handleReplyTweet,
    setIsReplied,
  } = useSupabase();
  return (
    <div className="bg-twitter-black p-4 w-full">
      <div className="flex justify-between">
        <RxCross2
          onClick={() => setIsReplied(false)}
          className="text-2xl hover:text-twitter-Lightgray cursor-pointer"
        />
        <button className="hover:bg-twitter-blue hover:text-twitter-Lightgray rounded-full cursor-pointer px-4 py-0.5">
          <span className="text-sm font-bold">Drafts</span>
        </button>
      </div>
      <div className="flex gap-x-1 mt-4">
        <div className="flex flex-col space-y-3">
          <div className="w-10 h-10 rounded-full bg-gray-800" />
          <div className="w-0.5 h-[10%] bg-gray-500" />
          <div className="w-10 h-10 rounded-full bg-gray-800" />
        </div>
        <div className="flex-1">
          <div>
            <div className="flex flex-col items-start ml-2">
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
            <div className="mt-2">
              <p className="text-twitter-Lightgray">
                Replying to @{tweet.profiles.username}
              </p>
            </div>
            <div className="border-b border-twitter-gray mt-4">
              <div className="flex gap-x-2 pt-4">
                <div className="pb-2 w-full">
                  <textarea
                    onChange={(e) => setTwitte(e.target.value)}
                    value={twitte}
                    name="post"
                    id="post"
                    placeholder="What's happening?"
                    className="text-[1.35rem] font-extralight w-full focus:outline-none bg-transparent resize-none"
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="px-4">
                <hr className="w-full text-twitter-gray" />
                <div className="py-4 flex justify-between">
                  <div className="flex space-x-1 flex-wrap">
                    <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                      <CiImageOn className="text-twitter-blue text-xl" />
                    </button>
                    <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                      <HiOutlineGif className="text-twitter-blue text-xl" />
                    </button>
                    <button className="hover:bg-sky-500/10 hover:text-sky-500 p-2 cursor-pointer rounded-full w-fit">
                      <img
                        src="/grok-blue.svg"
                        alt="Grok"
                        className="w-5 h-5"
                      />
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
                            <path
                              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#2F3336"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={`${
                                twitte.length > 80 ? "#aa2020" : "#1D9BF0"
                              }`}
                              strokeWidth="2"
                              strokeDasharray={`${
                                (twitte.length / 80) * 100
                              }, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
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
                      <div className="text-red-500 text-sm mt-2 px-4">
                        {error}
                      </div>
                    )}

                    <Button
                      disabled={
                        twitte.length === 0 || twitte.length > 80 || isPosting
                      }
                      onClick={() => {
                        handleReplyTweet(tweet.id);
                        setIsReplied(false);
                      }}
                      className={`${
                        twitte.length === 0 || twitte.length > 80
                          ? "bg-white/50"
                          : "cursor-pointer"
                      } rounded-full px-4 py-1 font-bold `}
                    >
                      {isPosting ? "Replying..." : "Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
