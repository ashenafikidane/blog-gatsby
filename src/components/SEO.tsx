import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  article = false,
  pathname,
}) => {
  const siteTitle = "Gatsby Blog CMS";
  const siteDescription =
    "A professional blog CMS built with Gatsby, React, and Redux Toolkit";
  const siteUrl =
    "https://688f2d63fd3c3cf22a9c4993--ornate-queijadas-0a418f.netlify.app";
  const siteImage = "/icon.png";

  const seo = {
    title: title ? `${title} | ${siteTitle}` : siteTitle,
    description: description || siteDescription,
    image: image || siteImage,
    url: pathname ? `${siteUrl}${pathname}` : siteUrl,
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default SEO;
