import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { formatDate } from "../utils/dateUtils";

interface PostTemplateData {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      author: string;
      summary: string;
      tags: string[];
    };
    body: string;
  };
}

const PostTemplate: React.FC<PageProps<PostTemplateData>> = ({
  data,
  location,
}) => {
  const { frontmatter, body } = data.mdx;

  // Custom components for MDX
  const components = {
    h1: (props: any) => (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-6"
        {...props}
      />
    ),
    h2: (props: any) => (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 mb-4 mt-8"
        {...props}
      />
    ),
    h3: (props: any) => (
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-gray-900 mb-3 mt-6"
        {...props}
      />
    ),
    p: (props: any) => (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-700 leading-relaxed mb-4"
        {...props}
      />
    ),
    code: (props: any) => (
      <code
        className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    pre: (props: any) => (
      <motion.pre
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6"
        {...props}
      />
    ),
    ul: (props: any) => (
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="list-disc list-inside text-gray-700 mb-4 space-y-1"
        {...props}
      />
    ),
    ol: (props: any) => (
      <motion.ol
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="list-decimal list-inside text-gray-700 mb-4 space-y-1"
        {...props}
      />
    ),
    li: (props: any) => <li className="text-gray-700" {...props} />,
    blockquote: (props: any) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4"
        {...props}
      />
    ),
  };

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.summary}
        article={true}
        pathname={location.pathname}
      />

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {frontmatter.title}
          </h1>

          <div className="flex items-center justify-center text-gray-500 mb-6">
            <span>{formatDate(frontmatter.date)}</span>
            <span className="mx-2">•</span>
            <span>{frontmatter.author}</span>
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {frontmatter.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:text-gray-600 prose-code:text-gray-800 prose-pre:bg-gray-900 prose-pre:text-gray-100"
        >
          <MDXProvider components={components}>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </MDXProvider>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Written by {frontmatter.author} on {formatDate(frontmatter.date)}
            </p>
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all posts
            </a>
          </div>
        </motion.footer>
      </article>
    </Layout>
  );
};

export default PostTemplate;

export const Head: HeadFC<PostTemplateData> = ({ data }) => (
  <title>{data.mdx.frontmatter.title}</title>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        author
        summary
        tags
      }
      body
    }
  }
`;
