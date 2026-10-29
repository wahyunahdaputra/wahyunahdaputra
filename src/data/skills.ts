export type SkillGroup = {
  id: string;
  title: string;
  icon: "network" | "code" | "wrench";
  summary: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "network",
    title: "Network Engineering & IT Infrastructure",
    icon: "network",
    summary: "Menjaga jaringan, perangkat, dan sistem tetap stabil di lingkungan operasional.",
    items: [
      "LAN & TCP/IP",
      "Network Troubleshooting",
      "Router & Switch",
      "Network Configuration",
      "CCTV Installation & Maintenance",
      "IT Infrastructure Support",
      "Hardware Troubleshooting",
      "Printer & Peripheral Support",
    ],
  },
  {
    id: "software",
    title: "Software Engineering",
    icon: "code",
    summary: "Membangun aplikasi web yang rapi, mudah dirawat, dan bermanfaat.",
    items: ["TypeScript", "JavaScript", "PHP", "Laravel", "Vue.js", "React", "REST API", "WordPress", "Database Management", "MySQL"],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    icon: "wrench",
    summary: "Perangkat kerja sehari-hari untuk kolaborasi, administrasi, dan diagnosa.",
    items: ["Git & GitHub", "Visual Studio Code", "Microsoft Office", "Windows Administration", "Network Diagnostic Tools"],
  },
];
