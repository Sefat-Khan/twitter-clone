import { Button } from "./ui/button";

export default function RightSideBar() {
  return (
    <section className="w-[490px] h-[86rem]">
      <div className="relative">
        <div className="sticky top-0">
          <div className="mr-[5.2rem] ml-8 h-[16rem]">
            <div className="sticky top-0 z-10 bg-black pt-1 pb-2">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="px-3 py-2 rounded-full border border-gray-600 w-full mt-1 mx-1 bg-black"
              />
            </div>

            <div className="border border-gray-600 w-full mt-4 mx-1 rounded-xl px-4 py-2">
              <h3 className="text-[1.30rem] font-extrabold">
                Subscribe to Premium
              </h3>
              <p className="text-gray-300 text-[0.95rem]">
                Subscribe to unlock new features and if eligible, receive a
                share of revenue.
              </p>
              <button className="px-4 py-[0.40rem] mt-2 font-bold text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] cursor-pointer rounded-full">
                Subscribe
              </button>
            </div>
            <div className="border border-gray-600 w-full mt-4 mx-1 rounded-xl px-4 py-2">
              <h3 className="text-[1.30rem] font-extrabold">
                What's happening
              </h3>
              <div className="flex flex-col gap-y-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start mt-4 -mx-4 py-2 px-5 hover:bg-[#080808] cursor-pointer"
                  >
                    <div>
                      <p className="text-xs text-gray-500">
                        Trending in Bangladesh
                      </p>
                      <h4 className="font-bold">I Don't</h4>
                      <span className="text-xs text-gray-500">!.28M posts</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="-mx-4 -mb-2 pb-3 pt-6 px-5 rounded-b-2xl text-sky-500 font-light hover:bg-[#080808] cursor-pointer">
                Show More
              </p>
            </div>
            <div className="border border-gray-600 w-full mt-4 mx-1 rounded-xl px-4 py-2">
              <h3 className="text-[1.30rem] font-extrabold">Who to follow</h3>
              <div className="flex flex-col mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="hover:bg-[#080808] cursor-pointer -mx-4 py-2 px-5 flex items-center justify-between"
                  >
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-gray-900"></div>
                      <div>
                        <a href="" className="font-bold">
                          shdfbfsdkcfkesjhf{" "}
                        </a>
                        <p className="font-light text-gray-500">
                          @hjdfgsdfgfsdg
                        </p>
                      </div>
                    </div>
                    <Button className="px-4 py-[0.30rem] rounded-full cursor-pointer font-bold text-[0.9rem]">
                      Follow
                    </Button>
                  </div>
                ))}
                <p className="-mx-4 -mb-2 pb-3 pt-6 px-5 rounded-b-2xl text-sky-500 font-light hover:bg-[#080808] cursor-pointer">
                  Show More
                </p>
              </div>
            </div>
            <div className="mt-4 mb-16">
              <div className="flex justify-around">
                <a
                  href=""
                  className="text-sm text-gray-600 font-light decoration-gray-600 hover:underline"
                >
                  Terms of Service
                </a>
                <div className="w-0.5 h-4 bg-gray-700"></div>
                <a
                  href=""
                  className="text-sm text-gray-600 font-light decoration-gray-600 hover:underline"
                >
                  Privacy Policy
                </a>
                <div className="w-0.5 h-4 bg-gray-700"></div>
                <a
                  href=""
                  className="text-sm text-gray-600 font-light decoration-gray-600 hover:underline"
                >
                  Cookie Policy
                </a>
              </div>
              <div className="flex gap-x-2 mt-2 ml-2">
                <p className="text-sm text-gray-600 font-light decoration-gray-600 hover:underline cursor-pointer">
                  More...
                </p>
                <span className="text-sm text-gray-600 font-light">
                  © 2025 X Corp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
