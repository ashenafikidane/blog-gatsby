export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  summary: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export interface Author {
  name: string;
  bio: string;
  image: string;
  social: {
    x?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface PageProps {
  location: Location;
  pageContext?: any;
}

export interface PostTemplateProps extends PageProps {
  data: {
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
  };
}

export interface IndexPageProps extends PageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string;
        frontmatter: {
          title: string;
          date: string;
          author: string;
          summary: string;
          tags: string[];
        };
        slug: string;
        excerpt: string;
      }>;
    };
  };
}
