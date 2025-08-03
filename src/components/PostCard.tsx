import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { formatDate, getPostSlug } from "../utils/utils";

interface PostCardProps {
  post: {
    id: string;
    frontmatter: {
      title: string;
      date: string;
      author: string;
      summary: string;
      tags: string[];
      slug?: string;
    };
    slug?: string;
    excerpt: string;
  };
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/posts/${getPostSlug(post)}`} className="block">
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{formatDate(post.frontmatter.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.frontmatter.author}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.frontmatter.title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.frontmatter.summary || post.excerpt}
          </p>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontmatter.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {post.frontmatter.tags.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  +{post.frontmatter.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center text-blue-600 font-medium text-sm">
            Read more
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
