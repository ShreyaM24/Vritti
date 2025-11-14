import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:4000/api/forum";

const CommunityForum = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [newPost, setNewPost] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(API_URL);
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayName = (user) => {
    if (!user) return "Unknown";
    if (user.role === "admin") return `${user.username} (Admin)`;
    return user.username;
  };

  const handleNewPost = async () => {
    if (!newPost.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        API_URL,
        { text: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([res.data, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error("❌ Failed to create post:", err);
    }
  };

  const handleReaction = async (postId, reaction) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/${postId}/react`,
        { reaction },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
    } catch (err) {
      console.error("❌ Failed to react:", err);
    }
  };

  const handleReport = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/${postId}/report`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
    } catch (err) {
      console.error("❌ Failed to report:", err);
    }
  };

  const handleReply = async (postId) => {
    if (!replyText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/${postId}/reply`,
        { text: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      console.error("❌ Failed to reply:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "dislikes") return b.dislikes - a.dislikes;
    if (sortBy === "reports") return b.reportCount - a.reportCount;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="flex min-h-screen bg-[#fdf6e3] dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        <div className="sticky top-0 z-20 bg-[#fdf6e3] dark:bg-gray-900 shadow transition-colors">
          <Topbar />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-green-900 dark:text-white mb-6">
            {t("communityForum.title")}
          </h1>

          {/* Create new post */}
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="Write something..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-1 p-3 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <button
              onClick={handleNewPost}
              className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Post
            </button>
          </div>

          {/* Sorting */}
          <div className="mb-4">
            <label className="mr-2 font-semibold dark:text-white">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="date">Newest</option>
              <option value="likes">Most Liked</option>
              <option value="dislikes">Most Disliked</option>
              <option value="reports">Most Reported</option>
            </select>
          </div>

          {loading ? (
            <p className="dark:text-white">Loading posts...</p>
          ) : (
            sortedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-900 border border-green-200 dark:border-gray-700 p-6 rounded-2xl shadow mb-8 transition-colors"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-bold text-green-900 dark:text-white">
                      {displayName(post.user)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleReport(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Report {post.reportCount > 0 && `(${post.reportCount})`}
                  </button>
                </div>

                {/* Content */}
                <p className="mb-4 text-green-900 dark:text-white">{post.text}</p>

                {/* Actions */}
                <div className="flex items-center gap-4 text-green-900 dark:text-white mb-4">
                  <button onClick={() => handleReaction(post._id, "like")}>
                    👍 {post.likes}
                  </button>
                  <button onClick={() => handleReaction(post._id, "dislike")}>
                    👎 {post.dislikes}
                  </button>
                  <button onClick={() => setReplyingTo(post._id)}>Reply</button>
                  {post.reportCount > 0 && (
                    <span className="text-red-500">
                      🚨 {post.reportCount} reports
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>

                {/* Reply box */}
                {replyingTo === post._id && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 p-2 border rounded-lg bg-gray-800 text-white dark:border-gray-700"
                    />
                    <button
                      onClick={() => handleReply(post._id)}
                      className="bg-green-900 text-white px-4 rounded-lg hover:bg-green-700 transition"
                    >
                      Send
                    </button>
                  </div>
                )}

                {/* Replies */}
                <div className="ml-6 space-y-2">
                  {post.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors"
                    >
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">
                        {displayName(reply.user)}
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{reply.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(reply.date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
