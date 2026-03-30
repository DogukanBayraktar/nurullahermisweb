import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // ── Mevcut redirect ──
      {
        source: '/tedavilerimiz/ortopedi-egzersizleri/skolyoz-egzersizleri',
        destination: '/saglik-rehberi/skolyoz-egzersizleri',
        permanent: true,
      },

      // ── Blog sayfaları → Ana sayfa ──
      { source: '/blog/yurume-analizi', destination: '/', permanent: true },
      { source: '/blog/saglikli-ayakkabi-secimi', destination: '/', permanent: true },
      { source: '/blog/mucize-spor-yuzme', destination: '/', permanent: true },
      { source: '/blog/basinc-gidericiler', destination: '/', permanent: true },

      // ── Diğer eski sayfalar ──
      { source: '/doktora-sorun', destination: '/iletisim', permanent: true },
      { source: '/default.aspx', destination: '/', permanent: true },
      { source: '/tedavilerimiz/ortopedi-egzersizleri', destination: '/saglik-rehberi', permanent: true },
      { source: '/tedavilerimiz/ortopedi-egzersizleri/bel-fitigi-egzersizleri', destination: '/tedaviler/bel-fitigi-tedavisi', permanent: true },

      // ── Omurga / Skolyoz / Kifoz → skolyoz-kifoz-cerrahisi ──
      { source: '/tedavilerimiz/omurga-sagligi', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/boyun-hastaliklari', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/sirt-agrisi', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/skolyoz-nedir', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/skolyoz-nedir-1', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/kifoz-nedir', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/skolyoz-ve-yuzme', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/skolyozda-dikkat-edilmesi-gereken-kurallar', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/bant-ile-duezeltme-yoentemi', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/omurga-tumorleri-ve-enfeksiyon', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/omurga-yaralanmalari', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/dar-kanal-ve-kireclenme', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/bel-agrisi', destination: '/tedaviler/skolyoz-kifoz-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/boyun-agrisi', destination: '/tedaviler/boyun-fitigi-cerrahisi', permanent: true },
      { source: '/tedavilerimiz/omurga-sagligi/omuz-agrisi', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },

      // ── Bel fıtığı ──
      { source: '/tedavilerimiz/kireclenme/bel-kireclenmesi', destination: '/tedaviler/bel-fitigi-tedavisi', permanent: true },

      // ── Çocuk ortopedisi ──
      { source: '/tedavilerimiz/cocuk-ortopedisi', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/aksayan-cocuk', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/ayak-problemleri', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/dogustan-femur-eksikligi', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/dogustan-tibia-eksikligi', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/dogustan-tibia-psodoartrozu', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/dogustan-deformiteler', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/dogustan-uzuv-eksiklikleri', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/serebral-palsi', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/metabolik-hastaliklar', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/kiriklar', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/kalca-problemleri', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },
      { source: '/tedavilerimiz/cocuk-ortopedisi/diz-problemleri', destination: '/tedaviler/cocuk-ortopedisi', permanent: true },

      // ── Diz / Kalça / Kireçlenme → diz-kalca-protezi ──
      { source: '/tedavilerimiz/kireclenme', destination: '/tedaviler/diz-kalca-protezi', permanent: true },
      { source: '/tedavilerimiz/kireclenme/kalca-kireclenmesi', destination: '/tedaviler/diz-kalca-protezi', permanent: true },
      { source: '/tedavilerimiz/kireclenme/omuz-kireclenmesi', destination: '/tedaviler/diz-kalca-protezi', permanent: true },
      { source: '/tedavilerimiz/spor-hekimligi/diz', destination: '/tedaviler/diz-kalca-protezi', permanent: true },

      // ── Spor hekimliği / Ayak / Omuz → artroskopik-cerrahi ──
      { source: '/tedavilerimiz/spor-hekimligi', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/spor-hekimligi/ayak-bilegi', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/spor-hekimligi/omuz', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/ayak-bilegi-instabiliteleri', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/kucuk-parmak-deformiteleri', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/freiberg-hastaligi', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/ayak-agrilari-hastaliklari', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/ayak-ve-ayak-bilegi-artriti', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
      { source: '/tedavilerimiz/ayak-sagligi/talusta-osteokondral-lezyon', destination: '/tedaviler/artroskopik-cerrahi', permanent: true },
    ];
  },
};

export default nextConfig;