require('dotenv').config({ path: './.env.local' });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const treatments = await prisma.treatment.findMany({ orderBy: { slug: 'asc' } });

  console.log('Mevcut tedaviler:');
  treatments.forEach(t => {
    const lang = t.slug.endsWith('_en') ? 'EN' : 'TR';
    console.log(`- ${t.slug} (${t.title}) - Lang: ${lang}`);
  });

  // İngilizce çevirileri ekleyelim
  const englishTranslations = {
    'artroskopik-cerrahi': {
      title: 'Arthroscopic Surgery',
      category: 'Orthopedic Surgery',
      desc: [
        'Arthroscopic surgery is a minimally invasive surgical procedure used to diagnose and treat joint problems. Through small incisions, a camera and specialized instruments are inserted into the joint to perform the surgery.',
        'This method offers advantages such as smaller incisions, less pain, faster recovery, and lower risk of complications compared to traditional open surgery.'
      ],
      symptoms: [
        'Joint pain and swelling',
        'Limited range of motion',
        'Joint locking or catching',
        'Chronic joint instability'
      ],
      stats: [{ label: 'Recovery time', val: '2–6 weeks' }, { label: 'Hospital stay', val: 'Same day' }, { label: 'Success rate', val: '90%+' }],
      treatment: [
        {
          baslik: 'Diagnostic Arthroscopy',
          icerik: 'Used to examine the inside of the joint and diagnose problems such as cartilage damage, ligament tears, or inflammation.'
        },
        {
          baslik: 'Therapeutic Arthroscopy',
          icerik: 'Involves repairing or removing damaged tissues, cleaning the joint, and restoring normal function.'
        }
      ],
      faq: [
        {
          s: 'How long does arthroscopic surgery take?',
          c: 'Most arthroscopic procedures take 30–90 minutes, depending on the complexity of the procedure.'
        },
        {
          s: 'When can I return to normal activities?',
          c: 'Light activities can usually be resumed within a few days, while full recovery and return to sports may take 4–6 weeks.'
        }
      ]
    },
    'bel-fitigi-tedavisi': {
      title: 'Lumbar Herniated Disc Treatment',
      category: 'Spine Surgery',
      desc: [
        'A lumbar herniated disc occurs when the soft inner material of a spinal disc pushes out through a tear in the tougher outer layer, potentially pressing on nearby nerves and causing pain.',
        'This condition is common in the lower back and can cause symptoms ranging from mild discomfort to severe pain that radiates down the legs.'
      ],
      symptoms: [
        'Lower back pain',
        'Pain radiating to the legs (sciatica)',
        'Numbness or tingling in the legs',
        'Muscle weakness',
        'Difficulty walking or standing'
      ],
      stats: [{ label: 'Surgical incision', val: '1.5 cm' }, { label: 'Operation time', val: '45–60 min' }, { label: 'Walking time', val: 'Same day' }],
      treatment: [
        {
          baslik: 'Microdiscectomy',
          icerik: 'A minimally invasive procedure where the herniated disc material is removed through a small incision using specialized instruments and a microscope.'
        },
        {
          baslik: 'Endoscopic Discectomy',
          icerik: 'An even less invasive technique using an endoscope to remove the herniated disc material with minimal tissue disruption.'
        }
      ],
      faq: [
        {
          s: 'Can a herniated disc heal without surgery?',
          c: 'Many cases improve with conservative treatment including rest, physical therapy, and medications. Surgery is considered when conservative treatments fail.'
        },
        {
          s: 'How long is the recovery period?',
          c: 'Most patients can return to light work within 1–2 weeks and full activities within 4–6 weeks.'
        }
      ]
    },
    'boyun-fitigi-cerrahisi': {
      title: 'Cervical Herniated Disc Surgery',
      category: 'Spine Surgery',
      desc: [
        'Cervical herniated disc occurs when a disc in the neck pushes out and presses on nearby nerves, causing pain and other symptoms in the neck, shoulders, and arms.',
        'This condition can significantly impact daily activities and quality of life if not properly treated.'
      ],
      symptoms: [
        'Neck pain',
        'Pain radiating to arms and hands',
        'Numbness or tingling in arms',
        'Muscle weakness',
        'Headaches'
      ],
      stats: [{ label: 'Surgical incision', val: '~3 cm' }, { label: 'Hospital stay', val: '1–2 days' }, { label: 'Return to work', val: '2–4 weeks' }],
      treatment: [
        {
          baslik: 'Anterior Cervical Discectomy and Fusion (ACDF)',
          icerik: 'Removal of the herniated disc through the front of the neck, followed by fusion of the adjacent vertebrae.'
        },
        {
          baslik: 'Cervical Disc Replacement',
          icerik: 'Removal of the damaged disc and replacement with an artificial disc to maintain neck mobility.'
        }
      ],
      faq: [
        {
          s: 'What are the risks of cervical disc surgery?',
          c: 'As with any surgery, there are risks including infection, nerve damage, and complications from anesthesia. However, these are rare with experienced surgeons.'
        },
        {
          s: 'How long does it take to recover?',
          c: 'Most patients experience significant improvement within 4–6 weeks, with full recovery taking 3–6 months.'
        }
      ]
    },
    'cocuk-ortopedisi': {
      title: 'Pediatric Orthopedics',
      category: 'Pediatric Orthopedics',
      desc: [
        'Pediatric orthopedics focuses on the diagnosis and treatment of musculoskeletal conditions in children and adolescents.',
        'Children\'s bones and joints are still growing, so treatment approaches differ significantly from adult orthopedics.'
      ],
      symptoms: [
        'Limb deformities',
        'Growth abnormalities',
        'Joint problems',
        'Sports injuries',
        'Congenital conditions'
      ],
      stats: [{ label: 'Age range', val: '0–18 years' }, { label: 'Treatment success', val: '95%+' }, { label: 'Non-surgical rate', val: '80%+' }],
      treatment: [
        {
          baslik: 'Conservative Treatment',
          icerik: 'Most pediatric orthopedic conditions can be treated with bracing, physical therapy, and monitoring growth.'
        },
        {
          baslik: 'Surgical Intervention',
          icerik: 'When necessary, minimally invasive surgical techniques are used to correct deformities and ensure proper growth.'
        }
      ],
      faq: [
        {
          s: 'At what age should children see an orthopedic specialist?',
          c: 'Children should be evaluated if there are concerns about walking, limb alignment, or if they complain of persistent pain.'
        },
        {
          s: 'Do children need special orthopedic care?',
          c: 'Yes, children\'s growing bodies require specialized knowledge of bone development and growth plate preservation.'
        }
      ]
    },
    'diz-kalca-protezi': {
      title: 'Knee & Hip Replacement',
      category: 'Joint Replacement',
      desc: [
        'Joint replacement surgery involves replacing damaged joint surfaces with artificial implants to relieve pain and restore function.',
        'This procedure is typically recommended when conservative treatments fail to provide adequate relief.'
      ],
      symptoms: [
        'Severe joint pain',
        'Limited mobility',
        'Joint stiffness',
        'Difficulty walking',
        'Reduced quality of life'
      ],
      stats: [{ label: 'Implant lifespan', val: '15–20 years' }, { label: 'Success rate', val: '95%+' }, { label: 'Recovery time', val: '3–6 months' }],
      treatment: [
        {
          baslik: 'Total Knee Replacement',
          icerik: 'Replacement of the entire knee joint with artificial components to restore pain-free movement.'
        },
        {
          baslik: 'Total Hip Replacement',
          icerik: 'Replacement of the hip joint with prosthetic components to eliminate pain and improve function.'
        }
      ],
      faq: [
        {
          s: 'How long do artificial joints last?',
          c: 'Modern implants typically last 15–20 years or longer, depending on activity level and implant type.'
        },
        {
          s: 'What is the recovery process like?',
          c: 'Recovery involves physical therapy and gradual return to activities, with most patients walking without assistance within 4–6 weeks.'
        }
      ]
    },
    'skolyoz-kifoz-cerrahisi': {
      title: 'Scoliosis & Kyphosis Surgery',
      category: 'Spine Surgery',
      desc: [
        'Surgical treatment of spinal deformities including scoliosis (side-to-side curvature) and kyphosis (forward curvature).',
        'Modern surgical techniques focus on correcting the deformity while preserving spinal function.'
      ],
      symptoms: [
        'Visible spinal curvature',
        'Back pain',
        'Breathing difficulties',
        'Reduced physical activity',
        'Cosmetic concerns'
      ],
      stats: [{ label: 'VBT Cobb angle', val: '40–65°' }, { label: 'Hospital stay', val: '3–5 days' }, { label: 'Correction success', val: '85%+' }],
      treatment: [
        {
          baslik: 'Vertebral Body Tethering (VBT)',
          icerik: 'A growth-friendly technique for adolescent scoliosis that corrects the spine without fusion.'
        },
        {
          baslik: 'Posterior Spinal Fusion (PSF)',
          icerik: 'Traditional surgical correction using modern instrumentation and navigation systems.'
        }
      ],
      faq: [
        {
          s: 'Can scoliosis be cured without surgery?',
          c: 'Mild cases may be managed with bracing and exercise, but significant curves often require surgical intervention.'
        },
        {
          s: 'When can patients return to sports?',
          c: 'Return to non-contact sports typically occurs at 6–9 months, with contact sports requiring 12+ months.'
        }
      ]
    }
  };

  console.log('\nİngilizce çeviriler ekleniyor...');

  for (const [slug, data] of Object.entries(englishTranslations)) {
    const trRecord = treatments.find(t => t.slug === slug);
    if (trRecord) {
      const enSlug = `${slug}_en`;
      const existingEn = treatments.find(t => t.slug === enSlug);

      if (!existingEn) {
        await prisma.treatment.create({
          data: {
            slug: enSlug,
            title: data.title,
            img: trRecord.img, // Aynı resmi kullan
            images: trRecord.images,
            category: data.category,
            stats: data.stats,
            desc: data.desc,
            symptoms: data.symptoms,
            treatment: data.treatment,
            faq: data.faq,
            published: trRecord.published
          }
        });
        console.log(`✓ ${enSlug} eklendi`);
      } else {
        console.log(`- ${enSlug} zaten mevcut`);
      }
    }
  }

  console.log('\nİşlem tamamlandı!');
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
  });
