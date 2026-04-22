import { client } from './client';

function pickLocalizedText(value: unknown) {
  if (typeof value === 'string') return value;

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidates = ['textTR', 'titleTR', 'textEN', 'titleEN', 'text', 'title', 'value'];

    for (const key of candidates) {
      const candidate = record[key];
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate;
      }
    }
  }

  return '';
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(pickLocalizedText).filter(Boolean);
}

function normalizeTreatmentMethodArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;

      return {
        baslik: pickLocalizedText(record.baslik),
        icerik: pickLocalizedText(record.icerik),
      };
    })
    .filter((item): item is { baslik: string; icerik: string } => Boolean(item?.baslik || item?.icerik));
}

function normalizeFaqArray(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;

      return {
        s: pickLocalizedText(record.s),
        c: pickLocalizedText(record.c),
      };
    })
    .filter((item): item is { s: string; c: string } => Boolean(item?.s || item?.c));
}

function normalizeTreatment(treatment: any) {
  if (!treatment) return treatment;

  return {
    ...treatment,
    description: normalizeStringArray(treatment.description),
    symptoms: normalizeStringArray(treatment.symptoms),
    treatments: normalizeTreatmentMethodArray(treatment.treatments),
    faq: normalizeFaqArray(treatment.faq),
  };
}

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
  const treatments = await client.fetch(`
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

  return treatments.map(normalizeTreatment);
}

export async function getTreatmentBySlug(slug: string) {
  const treatment = await client.fetch(`
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

  return normalizeTreatment(treatment);
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
