const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create pages for each MDX post
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            title
            date
            author
            summary
            tags
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.nodes;

  // Create individual post pages
  posts.forEach((post) => {
    // Use frontmatter slug or generate from filename
    const slug =
      post.frontmatter.slug ||
      post.internal.contentFilePath.split("/").pop().replace(".mdx", "");

    if (slug) {
      createPage({
        path: `/posts/${slug}`,
        component: path.resolve("./src/templates/post.tsx"),
        context: {
          id: post.id,
          slug: slug,
        },
      });
    }
  });
};
