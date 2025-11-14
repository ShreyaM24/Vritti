// src/pages/CommunityWall.jsx
import React, { useState, useEffect } from "react";
import CounsellorSidebar from "../components/CounsellorSidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Flag, Trash2, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api";

const CounsellorCommunityWall = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await apiFetch("/forum");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("❌ Failed to fetch posts:", err);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      await apiFetch("/forum", {
        method: "POST",
        body: JSON.stringify({ text: newPost }),
      });
      setNewPost("");
      loadPosts();
    } catch (err) {
      console.error("❌ Failed to create post:", err);
    }
  };

  const handleReact = async (id, reaction) => {
    try {
      await apiFetch(`/forum/${id}/react`, {
        method: "POST",
        body: JSON.stringify({ reaction }),
      });
      loadPosts();
    } catch (err) {
      console.error("❌ Failed to react:", err);
    }
  };

  const handleReply = async (id) => {
    if (!replyText[id]?.trim()) return;
    try {
      await apiFetch(`/forum/${id}/reply`, {
        method: "POST",
        body: JSON.stringify({ text: replyText[id] }),
      });
      setReplyText({ ...replyText, [id]: "" });
      loadPosts();
    } catch (err) {
      console.error("❌ Failed to reply:", err);
    }
  };

  const handleReport = async (id) => {
    try {
      await apiFetch(`/forum/${id}/report`, { method: "POST" });
      loadPosts();
    } catch (err) {
      console.error("❌ Failed to report:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/forum/${id}`, { method: "DELETE" });
      loadPosts();
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-950">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-50">
        <CounsellorSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-[#fdf6e3] dark:bg-gray-900 shadow">
          <Topbar />
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
          {/* Header */}
          <h1 className="text-2xl font-bold text-green-900 dark:text-white">
            {t("communityWall.title", "Community Wall")}
          </h1>

          {/* New Post Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={t(
                "communityWall.newPostPlaceholder",
                "Share your thoughts..."
              )}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-[#fdf6e3] dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handlePost}
              className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800 flex items-center gap-2 dark:bg-green-700 dark:hover:bg-green-600"
            >
              <Send size={16} /> {t("communityWall.postBtn", "Post")}
            </button>
          </div>

          {/* Posts */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl shadow-md border bg-white dark:bg-gray-800 border-green-200 dark:border-gray-700"
                >
                  {/* Post Header */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{post.avatar}</span>
                      <span className="text-sm font-semibold text-green-900 dark:text-white">
                        {post.role || "student"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleString()}
                    </span>
                  </div>

                  {/* Post Text */}
                  <p className="text-green-900 dark:text-white mb-3">{post.text}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-sm text-green-900 dark:text-white">
                    <button
                      onClick={() => handleReact(post._id, "like")}
                      className="flex items-center gap-1 hover:text-green-600"
                    >
                      <ThumbsUp size={16} /> {post.likes}
                    </button>
                    <button
                      onClick={() => handleReact(post._id, "dislike")}
                      className="flex items-center gap-1 hover:text-red-600"
                    >
                      <ThumbsDown size={16} /> {post.dislikes}
                    </button>
                    <button
                      onClick={() => handleReport(post._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700"
                    >
                      <Flag size={16} /> {post.reportCount || 0}
                    </button>

                    {/* Delete button */}
                    {user &&
                      (user.role === "admin" || user._id === post.user || user.id === post.user) && (
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      )}
                  </div>

                  {/* Replies */}
                  <div className="mt-4 space-y-2">
                    {post.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-white text-sm"
                      >
                        <span className="mr-2">{reply.avatar}</span>
                        <span className="font-semibold">{reply.role || "student"}:</span>{" "}
                        {reply.text}
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={replyText[post._id] || ""}
                      onChange={(e) =>
                        setReplyText({ ...replyText, [post._id]: e.target.value })
                      }
                      placeholder={t(
                        "communityWall.replyPlaceholder",
                        "Write a reply..."
                      )}
                      className="flex-1 p-2 border rounded-lg bg-[#fdf6e3] dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => handleReply(post._id)}
                      className="bg-green-900 text-white px-3 py-1 rounded-lg hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-green-700 dark:text-green-300 mt-10">
                {t("communityWall.noPosts", "No posts yet. Be the first to share!")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorCommunityWall;
