// src/lib/mergePatientImages.ts
// Türkçe tedavi kaydındaki hasta görsellerini İngilizce tedavi kaydına aktarır.
// İngilizce başlıklar, açıklamalar ve hasta adları korunur.
/* eslint-disable @typescript-eslint/no-explicit-any */

function normKey(value: unknown): string {
  return String(value ?? '').trim().toLocaleLowerCase('tr-TR');
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

function cleanGallery(gallery: any): any[] | undefined {
  if (!Array.isArray(gallery)) return undefined;
  const cleaned = gallery.filter(
    (item) => item && typeof item === 'object' && item.img
  );
  return cleaned.length > 0 ? cleaned : undefined;
}

function cleanPatient(patient: any) {
  const gallery = cleanGallery(patient?.gallery);
  const { gallery: _omit, ...rest } = patient ?? {};
  return gallery ? { ...rest, gallery } : rest;
}

/**
 * EN treatment yapısına TR kaydındaki hasta fotoğraflarını ekler.
 * Önce hasta adını, bulamazsa aynı sıradaki hastayı eşleştirir.
 * EN metinlerini ve EN hasta adlarını değiştirmez.
 */
export function mergePatientImages(enTreatment: any[], trTreatment: any[]): any[] {
  if (!Array.isArray(enTreatment) || !Array.isArray(trTreatment)) {
    return enTreatment ?? [];
  }

  return enTreatment.map((enMethod, methodIndex) => {
    const trMethod = findByNameOrIndex(
      trTreatment,
      'baslik',
      enMethod?.baslik,
      methodIndex
    );

    if (!trMethod || !Array.isArray(enMethod?.submethods)) return enMethod;

    return {
      ...enMethod,
      submethods: enMethod.submethods.map((enSub: any, subIndex: number) => {
        const trSub = findByNameOrIndex(
          trMethod.submethods,
          'baslik',
          enSub?.baslik,
          subIndex
        );
        const trPatients: any[] = Array.isArray(trSub?.patients)
          ? trSub.patients
          : [];

        if (trPatients.length === 0) return enSub;

        const enPatients: any[] = Array.isArray(enSub?.patients)
          ? enSub.patients
          : [];
        const usedSourceIndexes = new Set<number>();

        const merged = enPatients.map((enPatient, patientIndex) => {
          const key = normKey(enPatient?.hastaAdi);
          let sourceIndex = key
            ? trPatients.findIndex(
                (patient) => normKey(patient?.hastaAdi) === key
              )
            : -1;

          // İsimler diller arasında farklıysa aynı sıradaki hasta eşleştirilir.
          if (sourceIndex < 0 && patientIndex < trPatients.length) {
            sourceIndex = patientIndex;
          }

          if (sourceIndex < 0) return cleanPatient(enPatient);

          usedSourceIndexes.add(sourceIndex);
          const trPatient = trPatients[sourceIndex];
          const gallery =
            cleanGallery(trPatient?.gallery) ??
            cleanGallery(enPatient?.gallery);

          const result: any = {
            ...enPatient,
            ...(trPatient?.img ? { img: trPatient.img } : {}),
          };

          if (gallery) result.gallery = gallery;
          else delete result.gallery;

          return result;
        });

        // EN kaydında hiç bulunmayan TR hastalarını da ekle.
        const extra = trPatients
          .filter((patient, index) => {
            const hasVisual =
              Boolean(patient?.img) || cleanGallery(patient?.gallery)?.length;
            return hasVisual && !usedSourceIndexes.has(index);
          })
          .map((patient) =>
            cleanPatient({
              hastaAdi: patient?.hastaAdi,
              img: patient?.img,
              gallery: patient?.gallery,
            })
          );

        return { ...enSub, patients: [...merged, ...extra] };
      }),
    };
  });
}

/**
 * Sayfa render edilirken EN içeriğine TR'deki güncel hasta görsellerini uygular.
 * EN başlık/açıklama/hasta adı korunur; görsel kaynağı TR kaydıdır.
 */
export function syncPatientImages(target: any[], source: any[]): any[] {
  return mergePatientImages(target, source);
}
