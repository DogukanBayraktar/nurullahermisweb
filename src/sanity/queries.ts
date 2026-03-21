import { client } from './client';

/* ─── BLOG ─── */

export async function getAllArticles() {
  return client.fetch(`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      summary,
      readTime,
      publishedAt,
      "coverImage": coverImage.asset->url,
    }
  `);
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      summary,
      content,
      readTime,
      publishedAt,
      seoDescription,
      "coverImage": coverImage.asset->url,
    }
  `, { slug });
}

export async function getAllBlogSlugs() {
  const data = await client.fetch(`*[_type == "blog"]{ "slug": slug.current }`);
  return data.map((d: { slug: string }) => ({ slug: d.slug }));
}

/* ─── TEDAVİLER ─── */

export async function getAllTreatments() {
  return client.fetch(`
    *[_type == "treatment"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      stats,
      description,
      "coverImage": coverImage.asset->url,
    }
  `);
}

export async function getTreatmentBySlug(slug: string) {
  return client.fetch(`
    *[_type == "treatment" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      stats,
      description,
      symptoms,
      treatments,
      faq,
      "coverImage": coverImage.asset->url,
    }
  `, { slug });
}

export async function getAllTreatmentSlugs() {
  const data = await client.fetch(`*[_type == "treatment"]{ "slug": slug.current }`);
  return data.map((d: { slug: string }) => ({ slug: d.slug }));
}

/* ─── HASTA YORUMLARI ─── */

export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && isVisible == true] | order(publishedAt desc) {
      _id,
      author,
      detail,
      text,
      rating,
    }
  `);
}
