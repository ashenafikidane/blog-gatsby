export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getPostSlug = (post: any): string => {
  return (
    post.frontmatter?.slug ||
    post.slug ||
    generateSlug(post.frontmatter?.title || "")
  );
};

// Helper function to generate initials from name
export const generateInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
