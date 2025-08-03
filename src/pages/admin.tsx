import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import { Provider } from "react-redux";
import { store } from "../state/store";
import AdminForm from "../components/AdminForm";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const AdminPage: React.FC<PageProps> = () => {
  return (
    <Provider store={store}>
      <Layout>
        <SEO
          title="Admin"
          description="Create and edit blog posts with our admin interface."
        />
        <AdminForm />
      </Layout>
    </Provider>
  );
};

export default AdminPage;

export const Head: HeadFC = () => <title>Admin</title>;
