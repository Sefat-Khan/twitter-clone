import { useSupabase } from "../app/context/supabaseContext";

export default function Technical({ Id, tweetId, name }) {
  const {
    setOpenMenuId,
    openMenuId,
    setEditId,
    replies,
    setTwitte,
    deleteEvery,
  } = useSupabase();
  return (
    <div className="bg-twitter-black w-[10rem] absolute top-4 -right-6 flex flex-col">
      <button className="bg-blue-500 text-white hover:bg-twitter-blue/50 cursor-pointer px-6 py-1 text-sm">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setTwitte(replies.find((r) => r.id === Id)?.text || "");
            setEditId(Id);
            setOpenMenuId(openMenuId === Id ? null : Id);
          }}
          className="w-full"
        >
          Edit Reply
        </span>
      </button>
      <button
        className="bg-red-500 text-white hover:bg-red-500/85 cursor-pointer px-6 py-1 text-sm"
        onClick={() => deleteEvery(Id, tweetId, name)}
      >
        <span className="w-full">Delete Reply</span>
      </button>
    </div>
  );
}
