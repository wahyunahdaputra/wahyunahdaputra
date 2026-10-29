export type CertType = "Certification" | "Training" | "Workshop" | "Technical Training" | "Academic";

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  type: CertType;
  url?: string;
  /** true = shown as an empty slot for you to fill in */
  placeholder?: boolean;
};

/** Replace placeholders with your real certificates. Never list anything you have not earned. */
export const certifications: Certification[] = [
  {
    title: "Studi Independen Bersertifikat Batch 6 - Golang Backend Development",
    issuer: "MIKTI",
    date: "Juni 2024",
    type: "Certification",
  },
  { 
    title: "Certified Course Backend Python",
    issuer: "Progate",
    date: "August 2021",
    type: "Certification",
  },
  // { 
  //   title: "Add an IT training or workshop",
  //   issuer: "Organizer",
  //   date: "—",
  //   type: "Workshop",
  // },
  // { 
  //   title: "Add an academic achievement",
  //   issuer: "Universitas Halu Oleo",
  //   date: "—",
  //   type: "Academic",
  // },
];
