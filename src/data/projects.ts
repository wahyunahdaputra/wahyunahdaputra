export type ProjectStatus = "Draft" | "In Development" | "Completed";

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  /** Path in /public, e.g. "/projects/company.jpg". Empty = generated visual. */
  thumbnail: string;
  stack: string[];
  github?: string;
  demo?: string;
  overview: string;
  problem: string;
  solution: string;
  screenshots: string[];
  results: string;
};

/** Example entries — edit text, status, and links to match your real work. */
export const projects: Project[] = [
  {
    slug: "company-profile-website",
    title: "Company Profile Website",
    category: "Web Development",
    status: "In Development",
    description: "Website profil perusahaan yang informatif, responsif, dan mudah dikelola.",
    thumbnail: "/kochi.png",
    stack: ["WordPress", "PHP", "MySQL"],
    overview: "Tuliskan gambaran umum proyek di sini.",
    problem: "Jelaskan masalah yang ingin diselesaikan.",
    solution: "Jelaskan solusi yang Anda bangun.",
    screenshots: ['/kochi1.png','/kochi2.png'],
    results: "Tuliskan hasil implementasi setelah proyek berjalan.",
  },
  {
    slug: "digital-inventory-management",
    title: "Digital I Management System",
    category: "Software Engineering",
    status: "In Development",
    description: "Sistem pengelolaan inventaris digital untuk mempermudah pencatatan barang dan pencarian transaksi barang.",
    thumbnail: "/kochinv.png",
    stack: ["Laravel", "Vue.js", "PotsgreSQL", "REST API"],
    overview: "Tuliskan gambaran umum proyek di sini.",
    problem: "Jelaskan masalah yang ingin diselesaikan.",
    solution: "Jelaskan solusi yang Anda bangun.",
    screenshots: ['/kochinv1.png','/kochinv2.png'],
    results: "Tuliskan hasil implementasi setelah proyek berjalan.",
  },
  {
    slug: "it-infrastructure-network",
    title: "IT Infrastructure & Network Implementation",
    category: "Network Engineering",
    status: "Draft",
    description: "Perancangan dan implementasi jaringan serta infrastruktur IT untuk lingkungan operasional.",
    thumbnail: "",
    stack: ["LAN", "TCP/IP", "Router & Switch", "CCTV"],
    overview: "Tuliskan gambaran umum proyek di sini.",
    problem: "Jelaskan masalah yang ingin diselesaikan.",
    solution: "Jelaskan solusi yang Anda bangun.",
    screenshots: [],
    results: "Tuliskan hasil implementasi setelah proyek berjalan.",
  },
  {
    slug: "online-photostrip",
    title: "Online Photostrip / Photobox Application",
    category: "Web Application",
    status: "In Development",
    description: "Aplikasi photobox berbasis web untuk membuat photostrip langsung dari browser.",
    thumbnail: "/ar.png",
    stack: ["TypeScript", "React"],
    overview: "Tuliskan gambaran umum proyek di sini.",
    problem: "Jelaskan masalah yang ingin diselesaikan.",
    solution: "Jelaskan solusi yang Anda bangun.",
    screenshots: ['/ar1.png','/ar2.png'],
    results: "Tuliskan hasil implementasi setelah proyek berjalan.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
