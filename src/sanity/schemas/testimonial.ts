import { defineField, defineType } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Hasta Yorumları',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Hasta Adı', type: 'string', validation: R => R.required() }),
    defineField({ name: 'detail', title: 'Detay (yaş, hastalık vb.)', type: 'string' }),
    defineField({ name: 'text', title: 'Yorum', type: 'text', rows: 4, validation: R => R.required().max(300) }),
    defineField({ name: 'rating', title: 'Puan (1-5)', type: 'number', initialValue: 5, validation: R => R.min(1).max(5) }),
    defineField({ name: 'isVisible', title: 'Sitede Göster', type: 'boolean', initialValue: true }),
    defineField({ name: 'publishedAt', title: 'Tarih', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'text' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 60) + '…' };
    },
  },
});
