"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { toggleBookmark, toggleLike } from "../utils/tweetActions";

const supabase = createClient();

const SupabaseContext = createContext<SupabaseContextType>(
  {} as SupabaseContextType
);

export const useSupabase = () => useContext(SupabaseContext);

type Tweet = {
  id: string;
  text: string;
  created_at: string;
  profiles: {
    id: string;
    username: string;
    email: string;
    full_name: string;
  };
  is_liked: { user_id: string }[];
  is_bookmarked: boolean;
  is_replied: { user_id: string }[];
  likes_count: number;
  replies_count: number;
};

type Reply = {
  id: string;
  text: string;
  created_at: string;
  replies_count: number;
  user_id: string;
  tweet_id: string;
  profiles: {
    full_name: string;
    username: string;
  };
};

type SupabaseContextType = {
  tweets: Tweet[];
  replies: Reply[];
  loading: boolean;
  isPosting: boolean;
  error: string | null;
  openMenuId: string | null;
  editId: string | null;
  activeTab: string | null;
  twitte: string;
  setTwitte: (value: string) => void;
  handlePostTweet: () => Promise<void>;
  handleLike: (tweetId: string) => Promise<void>;
  handleBookmark: (tweetId: string) => Promise<void>;
  handleReplie: (tweetId: string) => Promise<void>;
  handleReplyTweet: (tweetId: string) => Promise<void>;
  focus: boolean;
  setFocus: (value: boolean) => void;
  userData: any;
  setIsReplied: (value: boolean) => void; // Add proper type
  isReplied: boolean;
};

import { ReactNode } from "react";

type SupabaseProviderProps = {
  children: ReactNode;
};

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [userData, setUserData] = useState<any>(null);
  const [focus, setFocus] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Posts");
  const [isReplied, setIsReplied] = useState(false);
  const [twitte, setTwitte] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePostTweet = async () => {
    if (twitte.length === 0 || twitte.length > 80) return;

    setIsPosting(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to post a tweet");
      }

      const tweetId = crypto.randomUUID();

      const { data, error: insertError } = await supabase
        .from("tweets")
        .insert([
          {
            id: tweetId,
            text: twitte,
            profile_id: user.id,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      setTwitte("");
      setFocus(false);
    } catch (err) {
      setError(err.message || "Failed to post tweet");
      console.error("Error posting tweet:", err);
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error("You must be logged in to view tweets");
        }

        const { data: tweetsData, error: tweetsError } = await supabase
          .from("tweets")
          .select(
            `id, text, created_at, profiles:profile_id (
                id, username, email, full_name
                ),
                likes_count, replies_count`
          )
          .order("created_at", { ascending: false });

        if (tweetsError) throw tweetsError;

        const safeTweetsData = tweetsData || [];

        const tweetIds = safeTweetsData.map((tweet) => tweet.id);

        let bookmarksData = [];
        let userLikes = [];
        let userReplies = [];

        if (tweetIds.length > 0) {
          const [
            { data: bData, error: bError },
            { data: lData, error: lError },
            { data: rData, error: rError },
          ] = await Promise.all([
            supabase
              .from("bookmarks")
              .select("tweet_id")
              .eq("user_id", user.id)
              .in("tweet_id", tweetIds),
            supabase
              .from("likes")
              .select("tweet_id")
              .eq("user_id", user.id)
              .in("tweet_id", tweetIds),
            supabase
              .from("replies")
              .select("tweet_id, id, text, user_id")
              .eq("user_id", user.id)
              .in("tweet_id", tweetIds),
          ]);

          if (bError) throw bError;
          if (lError) throw lError;
          if (rError) throw rError;

          bookmarksData = bData || [];
          userLikes = lData || [];
          userReplies = rData || [];
        }

        const combinedTweets = safeTweetsData.map((tweet) => {
          const bookmarks = bookmarksData.find(
            (bookmark) => bookmark.tweet_id === tweet.id
          );
          const isLiked = userLikes.some((like) => like.tweet_id === tweet.id);
          const isReplied = userReplies.some(
            (reply) => reply.tweet_id === tweet.id
          );
          const repliesCountMap = userReplies.filter(
            (reply) => reply.tweet_id === tweet.id
          ).length;

          return {
            ...tweet,
            is_liked: isLiked ? [{ user_id: user.id }] : [],
            is_bookmarked: !!bookmarks,
            is_replied: isReplied ? [isReplied] : [],
            likes_count: tweet.likes_count || 0,
            replies_count: repliesCountMap || 0,
          };
        });

        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .order("updated_at", { ascending: false });

        if (userError) throw userError;

        const mainUser = userData.find((u) => {
          if (u.id === user.id) {
            return {
              ...u,
            };
          }
        });

        setTweets(combinedTweets);
        setReplies(userReplies);
        setUserData(mainUser);
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setTweets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleLike = async (tweetId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              is_liked: tweet.is_liked?.length ? [] : [{ user_id: user.id }],
              likes_count: tweet.is_liked?.length
                ? tweet.likes_count - 1
                : tweet.likes_count + 1,
            }
          : tweet
      )
    );

    // Actual DB update
    await toggleLike(tweetId, user.id);
  };

  const handleBookmark = async (tweetId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setTweets((prev) =>
      prev.map((tweet) =>
        tweet.id === tweetId
          ? { ...tweet, is_bookmarked: !tweet.is_bookmarked }
          : tweet
      )
    );

    // Actual DB update
    await toggleBookmark(tweetId, user.id);
  };

  const handleReplie = async (tweetId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Actual DB update
    const { error: replyError } = await supabase.from("replies").insert({
      id: crypto.randomUUID(),
      text: twitte,
      user_id: user.id,
      tweet_id: tweetId,
    });

    if (replyError) {
      console.error("Error posting reply:", replyError);
      return;
    }

    const { data: newReplies } = await supabase
      .from("replies")
      .select("*")
      .eq("tweet_id", tweetId);

    if (newReplies) setReplies(newReplies);
  };

  const editReplies = async (
    replyId: string,
    newText: string,
    tweetId: string
  ) => {
    const { error: replyUpdateError } = await supabase
      .from("replies")
      .update({
        text: newText,
      })
      .eq("id", replyId);

    if (replyUpdateError) {
      console.error("Error updating reply:", replyUpdateError);
      return;
    }

    const { data: newReplies } = await supabase
      .from("replies")
      .select(`*, profiles: user_id (full_name, username)`)
      .eq("tweet_id", tweetId);

    if (newReplies) setReplies(newReplies);
  };

  const deleteReplies = async (replyId: string, tweetId: string) => {
    const { error: replyDeleteError } = await supabase
      .from("replies")
      .delete()
      .eq("id", replyId);

    if (replyDeleteError) {
      console.error("Error deleting reply:", replyDeleteError);
      return;
    }

    const { data: newReplies } = await supabase
      .from("replies")
      .select("*")
      .eq("tweet_id", tweetId);

    if (newReplies) setReplies(newReplies);
  };

  const handleReplyTweet = async (tweetId: string) => {
    if (twitte.length === 0 || twitte.length > 80) return;

    setIsPosting(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to post a tweet");
      }

      const replyId = crypto.randomUUID();

      const { error: insertError } = await supabase
        .from("replies")
        .insert([
          {
            id: replyId,
            text: twitte,
            user_id: user.id,
            tweet_id: tweetId,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      // Refresh replies after successful post
      const { data: newReplies } = await supabase
        .from("replies")
        .select(`*, profiles: user_id (full_name, username)`)
        .eq("tweet_id", tweetId);

      if (newReplies) setReplies(newReplies);

      // 2. Increment the replies count using the function
      const { error: incrementError } = await supabase.rpc(
        "increment_replies",
        { tweet_id: tweetId }
      );

      if (incrementError) throw incrementError;

      // 3. Optimistic UI update
      setTweets((prev) =>
        prev.map((tweet) =>
          tweet.id === tweetId
            ? { ...tweet, replies_count: (tweet.replies_count || 0) + 1 }
            : tweet
        )
      );

      setTwitte("");
      setFocus(false);
    } catch (err) {
      setError(err.message || "Failed to post tweet");
      console.error("Error posting tweet:", err);
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <SupabaseContext.Provider
      value={{
        tweets,
        replies,
        loading,
        isPosting,
        error,
        twitte,
        setTwitte,
        handlePostTweet,
        handleLike,
        handleBookmark,
        handleReplie,
        handleReplyTweet,
        focus,
        setFocus,
        isReplied,
        setIsReplied,
        userData,
        openMenuId,
        setOpenMenuId,
        editReplies,
        deleteReplies,
        editId,
        setEditId,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
