import { createClient } from "./supabase/client";


export async function toggleLike(tweetId: string, userId: string) {
  const supabase = createClient();

  try {
    // Check if like already exists
    const { data: existingLike, error: fetchError } = await supabase
      .from("likes")
      .select("id")
      .eq("tweet_id", tweetId)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingLike) {
      // Unlike the tweet
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("id", existingLike.id);

      if (deleteError) throw deleteError;

      // Decrement likes count using RPC
      const { error: decrementError } = await supabase
        .rpc('decrement_likes', { tweet_id: tweetId });

      if (decrementError) throw decrementError;

      return { liked: false, error: null };
    } else {
      // Like the tweet
      const { error: insertError } = await supabase
        .from("likes")
        .insert({ 
          id: crypto.randomUUID(),
          tweet_id: tweetId, 
          user_id: userId 
        });

      if (insertError) throw insertError;

      // Increment likes count using RPC
      const { error: incrementError } = await supabase
        .rpc('increment_likes', { tweet_id: tweetId });

      if (incrementError) throw incrementError;

      return { liked: true, error: null };
    }
  } catch (error) {
    console.error("Error in toggleLike:", error);
    return { liked: false, error };
  }
}

export async function toggleBookmark(tweetId: string, userId: string) {
  const supabase = createClient();

  try {
    const { data: existingBookmark, error: fetchError } = await supabase
      .from("bookmarks")
      .select('id')
      .eq('tweet_id', tweetId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingBookmark) {
      const { error: deleteError } = await supabase
        .from("bookmarks")
        .delete()
        .eq('id', existingBookmark.id);

      if (deleteError) throw deleteError;

      return { is_bookmarked: false, error: null };
    } else {
      const { error: insertError } = await supabase
        .from("bookmarks")
        .insert({ id: crypto.randomUUID(), tweet_id: tweetId, user_id: userId });

      if (insertError) throw insertError;

      return { is_bookmarked: true, error: null };
    }
  } catch (error) {
    console.error("Error in toggleBookmark:", error);
    return { is_bookmarked: false, error };
  }
}

