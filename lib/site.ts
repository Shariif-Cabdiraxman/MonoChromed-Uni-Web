/**
 * Brand configuration — the single source of truth for institutional identity.
 * Rename the institution here and it propagates through header, footer,
 * metadata and copy references.
 */
export const site = {
  /** Short wordmark used in the header and footer. */
  wordmark: "XEEB",
  /** Full display name used in prose and metadata. */
  name: "Xeeb University",
  /** Campus location. */
  location: "Port Adaar, Xeebta Soomaaliyeed",
  /** Current academic term, shown in the utility bar. */
  term: "Autumn Term 2026",
  tagline: "Teaching and research shaped by the coast it sits beside.",
  email: "office@xeeb.example.edu",
  phone: "+00 000 000 0000",
} as const;

export const nav = [
  {
    label: "Admissions",
    href: "#admissions",
    note: "Entry requirements, key dates and how to apply.",
  },
  {
    label: "News",
    href: "#news",
    note: "Announcements from across the university.",
  },
  {
    label: "Research",
    href: "#research",
    note: "Open papers, datasets and field projects.",
  },
  {
    label: "Faculties",
    href: "#faculties",
    note: "Seven faculties, one shared coastal campus.",
  },
  {
    label: "Semester Registration",
    href: "#registration",
    note: "Registration windows and student records.",
  },
  {
    label: "Library",
    href: "#library",
    note: "Collections, archives and open access support.",
  },
] as const;
