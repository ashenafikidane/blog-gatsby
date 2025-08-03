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

// Simple markdown parser for preview with code block support
export const parseMarkdownForPreview = (content: string): string => {
  if (!content) return "Start typing your content...";

  return (
    content
      // Handle code blocks with language specification
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || "text";
        const highlightedCode = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6"><code class="language-${language}">${highlightedCode}</code></pre>`;
      })
      // Handle inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
      )
      // Handle headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>'
      )
      // Handle bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Handle line breaks
      .replace(/\n/g, "<br>")
  );
};
