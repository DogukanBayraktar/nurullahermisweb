import { defineField, defineType } from 'sanity';

export const treatmentSchema = defineType({
  name: 'treatment',
  title: 'Tedavi Alanları',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Kategori', type: 'string',
      options: {
        list: [
          { title: 'Omurga Cerrahisi', value: 'Omurga Cerrahisi' },
          { title: 'Eklem Cerrahisi', value: 'Eklem Cerrahisi' },
          { title: 'Çocuk Ortopedisi', value: 'Çocuk Ortopedisi' },
          { title: 'Artroskopik Cerrahi', value: 'Artroskopik Cerrahi' },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({ name: 'coverImage', title: 'Kapak Fotoğrafı', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'stats', title: 'İstatistikler (max 3)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Etiket', type: 'string' },
          { name: 'val', title: 'Değer', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'val' } },
      }],
      validation: R => R.max(3),
    }),
    defineField({ name: 'description', title: 'Açıklama Paragrafları', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'symptoms', title: 'Belirtiler', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'treatments', title: 'Tedavi Yöntemleri', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'baslik', title: 'Yöntem Adı', type: 'string' },
          { name: 'icerik', title: 'Açıklama', type: 'text' },
        ],
        preview: { select: { title: 'baslik' } },
      }],
    }),
    defineField({
      name: 'faq', title: 'Sık Sorulan Sorular', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 's', title: 'Soru', type: 'string' },
          { name: 'c', title: 'Cevap', type: 'text' },
        ],
        preview: { select: { title: 's' } },
      }],
    }),
    defineField({ name: 'order', title: 'Sıralama', type: 'number', initialValue: 99 }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
  orderings: [{ title: 'Sıralama', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
