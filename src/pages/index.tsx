import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Welcome to Gatsby Blog
      </h1>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
