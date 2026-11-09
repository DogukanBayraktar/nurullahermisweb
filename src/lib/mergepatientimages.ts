// src/lib/mergePatientImages.ts
// TR tedavi kaydındaki hasta görsellerini (patients[].img / gallery) EN kaydına taşır.
// Hem admin "save" route'unda hem de EN detay sayfası render edilirken kullanılır.
/* eslint-disable @typescript-eslint/no-explicit-any */

function normKey(s: unknown): string {
  return String(s ?? '').trim().toLowerCase();
}

function findByNameOrIndex<T extends Record<string, any>>(
  list: T[] | undefined | null,
  nameField: string,
  name: unknown,
  fallbackIndex: number
): T | undefined {
  if (!Array.isArray(list)) return undefined;
  const key = normKey(name);
  if (key) {
    const match = list.find((item) => normKey(item?.[nameField]) === key);
    if (match) return match;
  }
  return list[fallbackIndex];
}

// img alanı olmayan boş galeri öğelerini ({}) temizler.
function cleanGallery(gallery: any): any[] | undefined {
  if (!Array.isArray(gallery)) return undefined;
  const cleaned = gallery.filter((g) => g && typeof g === 'object' && g.img);
  return cleaned.length > 0 ? cleaned : undefined;
}

function cleanPatient(p: any) {
  const gallery = cleanGallery(p?.gallery);
  const { gallery: _omit, ...rest } = p ?? {};
  return gallery ? { ...rest, gallery } : rest;
}

/**
 * EN methods/submethods/patients yapısına TR'deki hastaları ve görselleri ekler.
 * - Method/submethod eşleştirmesi başlığa göre (bulunamazsa index'e göre).
 * - Hasta eşleştirmesi SADECE isme göre (hasta adları çevrilmez).
 * - EN hastasında img/gallery yoksa TR'den alınır; EN'de hiç olmayan TR hastaları eklenir.
 * - EN'de zaten dolu olan img/gallery'ye dokunulmaz.
 */
export function mergePatientImages(enTreatment: any[], trTreatment: any[]): any[] {
  if (!Array.isArray(enTreatment) || !Array.isArray(trTreatment)) return enTreatment ?? [];

  return enTreatment.map((enMethod, mi) => {
    const trMethod = findByNameOrIndex(trTreatment, 'baslik', enMethod?.baslik, mi);
    if (!trMethod || !Array.isArray(enMethod?.submethods)) return enMethod;

    return {
      ...enMethod,
      submethods: enMethod.submethods.map((enSub: any, si: number) => {
        const trSub = findByNameOrIndex(trMethod.submethods, 'baslik', enSub?.baslik, si);
        const trPatients: any[] = Array.isArray(trSub?.patients) ? trSub.patients : [];
        if (trPatients.length === 0) return enSub;

        const enPatients: any[] = Array.isArray(enSub?.patients) ? enSub.patients : [];

        const merged = enPatients.map((enPat) => {
          const key = normKey(enPat?.hastaAdi);
          const trPat = key ? trPatients.find((t) => normKey(t?.hastaAdi) === key) : undefined;
          if (!trPat) return cleanPatient(enPat);
          const gallery = cleanGallery(enPat.gallery) ?? cleanGallery(trPat.gallery);
          const out: any = { ...enPat, img: enPat.img || trPat.img };
          if (gallery) out.gallery = gallery;
          else delete out.gallery;
          return out;
        });

        const usedNames = new Set(merged.map((p) => normKey(p?.hastaAdi)).filter(Boolean));
        const extra = trPatients
          .filter((t) => {
            const k = normKey(t?.hastaAdi);
            return k && !usedNames.has(k);
          })
          .map((t) => cleanPatient({ hastaAdi: t.hastaAdi, img: t.img, gallery: t.gallery }));

        return { ...enSub, patients: [...merged, ...extra] };
      }),
    };
  });
}