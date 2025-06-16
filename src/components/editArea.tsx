import { MdOutlineMoreHoriz } from "react-icons/md";
import { useSupabase } from "../app/context/supabaseContext";
import Technical from "./technical";

export default function EditArea({ data, tId, name }) {
  const { openMenuId, setOpenMenuId } = useSupabase();
  return (
    <>
      <MdOutlineMoreHoriz
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(openMenuId === data.id ? null : data.id);
        }}
        className="text-2xl"
      />
      {openMenuId === data.id && (
        <Technical Id={data.id} tweetId={tId} name={name} />
      )}
    </>
  );
}
