import { defineField, defineType } from 'sanity';

export const blogSchema = defineType({
  name: 'blog',
  title: 'Blog Makaleleri',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Kategori', type: 'string',
      options: {
        list: [
          { title: 'Bel Fıtığı', value: 'bel-fitigi' },
          { title: 'Skolyoz', value: 'skolyoz' },
          { title: 'Eklem Protezi', value: 'eklem-protezi' },
          { title: 'Boyun Fıtığı', value: 'boyun-fitigi' },
          { title: 'Çocuk Ortopedisi', value: 'cocuk-ortopedisi' },
          { title: 'Artroskopik Cerrahi', value: 'artroskopik-cerrahi' },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({ name: 'coverImage', title: 'Kapak Fotoğrafı', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'summary', title: 'Özet', type: 'text', rows: 3, validation: R => R.required().max(300) }),
    defineField({
      name: 'content', title: 'İçerik', type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image', options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Açıklama', type: 'string' },
            { name: 'alt', title: 'Alt metin', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'readTime', title: 'Okuma Süresi (dk)', type: 'number', initialValue: 5 }),
    defineField({ name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'seoDescription', title: 'SEO Açıklaması', type: 'text', rows: 2, validation: R => R.max(160) }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
  orderings: [{ title: 'Yeni → Eski', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
