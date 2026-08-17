import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Keep this route out of search results (checkout, moderation, keepsakes). */
  noIndex?: boolean;
  /** Absolute or root-relative image for social cards. */
  image?: string;
};

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (element) element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function Seo({ title, description, schema, noIndex, image }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | Visanam`;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', `${title} | Visanam`);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', `${title} | Visanam`);
    setMeta('meta[name="twitter:description"]', description);

    if (image) {
      setMeta('meta[property="og:image"]', image);
      setMeta('meta[name="twitter:image"]', image);
    }

    // Canonical URL, without query strings or hashes.
    if (typeof window !== "undefined") {
      setLink("canonical", `${window.location.origin}${window.location.pathname}`);
    }

    // robots
    let robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

    const previous = document.getElementById("visanam-schema");
    if (previous) previous.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = "visanam-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    return () => document.getElementById("visanam-schema")?.remove();
  }, [title, description, schema, noIndex, image]);

  return null;
}
