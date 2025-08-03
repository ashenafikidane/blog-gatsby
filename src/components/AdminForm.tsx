import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "../state/store";
import {
  updateField,
  savePost,
  clearForm,
  loadPosts,
  deletePost,
  toggleDraft,
  setCurrentPost,
} from "../state/blogFormSlice";
import { generateId, generateSlug } from "../utils/utils";

const AdminForm: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPost, posts, isEditing } = useSelector(
    (state: RootState) => state.blogForm
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleInputChange = (field: string, value: any) => {
    dispatch(updateField({ field: field as any, value }));

    // Auto-generate slug from title
    if (field === "title" && !currentPost.slug) {
      const slug = generateSlug(value);
      dispatch(updateField({ field: "slug", value: slug }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPost.title || !currentPost.content) {
      alert("Please fill in title and content");
      return;
    }

    const postToSave = {
      ...currentPost,
      id: currentPost.id || generateId(),
      slug: currentPost.slug || generateSlug(currentPost.title),
      date: currentPost.date || new Date().toISOString().split("T")[0],
      tags: currentPost.tags || [],
      isDraft: currentPost.isDraft !== false, // Default to true if not explicitly set
    } as any;

    dispatch(savePost(postToSave));
    dispatch(clearForm());
    alert("Post saved successfully!");
  };

  const handleEdit = (post: any) => {
    dispatch(setCurrentPost(post));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  const handleToggleDraft = (id: string) => {
    dispatch(toggleDraft(id));
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="text-gray-600">
          Use the form below to create or edit your blog posts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={currentPost.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={currentPost.slug || ""}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="post-url-slug"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={currentPost.date || ""}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={currentPost.author || ""}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary
              </label>
              <textarea
                value={currentPost.summary || ""}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief summary of the post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={
                  Array.isArray(currentPost.tags)
                    ? currentPost.tags.join(", ")
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="react, gatsby, web-development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (Markdown) *
              </label>
              <textarea
                value={currentPost.content || ""}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# Your markdown content here..."
                required
              />
            </div>

            {/* Draft Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isDraft"
                checked={currentPost.isDraft !== false}
                onChange={(e) => handleInputChange("isDraft", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isDraft"
                className="text-sm font-medium text-gray-700"
              >
                Save as draft
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isEditing ? "Update Post" : "Create Post"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Preview Toggle */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Live Preview
              </h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>

          {/* Preview Content */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentPost.title || "Preview Title"}
                </h2>
                {currentPost.isDraft !== false && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Draft
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {currentPost.date &&
                  new Date(currentPost.date).toLocaleDateString()}{" "}
                • {currentPost.author || "Author"}
              </div>
              <div className="prose prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentPost.content
                      ? currentPost.content
                          .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                          .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                          .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                          .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
                          .replace(/\*(.*)\*/gim, "<em>$1</em>")
                          .replace(/\n/gim, "<br>")
                      : "Start typing your content...",
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Saved Posts */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Saved Posts
            </h3>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No posts saved yet
              </p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {post.title}
                      </h4>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          post.isDraft
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {post.isDraft ? "Draft" : "Published"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {post.date} • {post.author}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleDraft(post.id)}
                        className={`text-sm ${
                          post.isDraft
                            ? "text-green-600 hover:text-green-700"
                            : "text-yellow-600 hover:text-yellow-700"
                        }`}
                      >
                        {post.isDraft ? "Publish" : "Unpublish"}
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminForm;
