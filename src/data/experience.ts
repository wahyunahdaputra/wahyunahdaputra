export type Experience = {
  role: string;
  company: string;
  /** Leave empty until you confirm the dates. */
  period: string;
  points: string[];
  highlights?: {
    title: string;
    date: string;
    description: string;
    /** Add photo paths from /public, e.g. ["/training/1.jpg"]. */
    photos: string[];
  }[];
};

export const experiences: Experience[] = [
  {
    role: "IT Staff",
    company: "Kochi Kendari",
    period: "",
    points: [
      "Mendukung operasional infrastruktur IT di lingkungan retail multi-cabang.",
      "Melakukan troubleshooting jaringan komputer, perangkat kasir, printer, dan perangkat keras.",
      "Mendukung instalasi dan pemeliharaan sistem CCTV.",
      "Menangani konfigurasi dan pemeliharaan perangkat jaringan.",
      "Terlibat dalam pengembangan dan pengelolaan website perusahaan.",
      "Memberikan pelatihan troubleshooting dasar perangkat IT kepada tim operasional dari 13 cabang Kochi Kendari.",
    ],
    highlights: [
      {
        title: "IT Technical Training",
        date: "October 2026",
        description: "Materi: Network, Computer Hardware, Printer, and CCTV Troubleshooting.",
        photos: ['tr1.jpeg', 'tr2.jpeg'],
      },
    ],
  },
];
