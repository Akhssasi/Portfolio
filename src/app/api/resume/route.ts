export const dynamic = "force-dynamic";

/** Minimal, dependency-free PDF document builder (Helvetica, single page). */
type PdfLine = {
  text: string;
  size?: number;
  bold?: boolean;
  gap?: number;
  color?: [number, number, number];
};

function esc(text: string): string {
  return text
    .replace(/[^\x20-\x7E]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function buildPdf(lines: PdfLine[]): Uint8Array {
  let y = 756;
  const content: string[] = [];

  for (const line of lines) {
    const size = line.size ?? 10;
    const gap = line.gap ?? 0;
    y -= gap + size + 5;
    const [r, g, b] = line.color ?? [0.16, 0.2, 0.3];
    content.push(
      `BT /${line.bold ? "F2" : "F1"} ${size} Tf ${r.toFixed(3)} ${g.toFixed(
        3,
      )} ${b.toFixed(3)} rg 56 ${y.toFixed(1)} Td (${esc(line.text)}) Tj ET`,
    );
    if (line.bold && size >= 13) {
      const ruleY = y - 6;
      content.push(
        `0.04 0.71 0.83 RG 1.4 w 56 ${ruleY.toFixed(1)} m 140 ${ruleY.toFixed(
          1,
        )} l S`,
      );
      y -= 8;
    }
  }

  const stream = content.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

const SLATE: [number, number, number] = [0.16, 0.2, 0.3];
const MUTED: [number, number, number] = [0.38, 0.43, 0.52];
const CYAN: [number, number, number] = [0.03, 0.55, 0.68];

const LINES: PdfLine[] = [
  { text: "DevPortfolioX", size: 22, bold: true, color: SLATE },
  {
    text: "Full Stack Engineer - Angular / TypeScript / Java / Spring Boot / PostgreSQL",
    size: 10.5,
    color: MUTED,
    gap: 6,
  },
  { text: "PROFILE", size: 13, bold: true, color: CYAN, gap: 14 },
  {
    text: "Full Stack Engineer bridging complex backend architectures and intuitive user",
    size: 9.5,
    gap: 8,
  },
  {
    text: "interfaces. Focused on secure Spring Boot APIs, type-safe Angular frontends,",
    size: 9.5,
  },
  {
    text: "normalized PostgreSQL schemas, and clean, maintainable system design.",
    size: 9.5,
  },
  { text: "CORE STACK", size: 13, bold: true, color: CYAN, gap: 14 },
  {
    text: "Frontend:   Angular, TypeScript, React, Vue, HTML5, SCSS, Tailwind CSS",
    size: 9.5,
    gap: 8,
  },
  {
    text: "Backend:    Java, Spring Boot, Spring Security, REST APIs, Node.js",
    size: 9.5,
  },
  {
    text: "Databases:  PostgreSQL, MySQL, JPA / Hibernate",
    size: 9.5,
  },
  {
    text: "Tools:      Git, GitHub, Docker, Swagger / OpenAPI, Postman",
    size: 9.5,
  },
  { text: "SELECTED PROJECTS", size: 13, bold: true, color: CYAN, gap: 14 },
  {
    text: "Enterprise E-Commerce Platform",
    size: 10,
    bold: true,
    gap: 8,
  },
  {
    text: "JWT auth, cart, order processing, admin dashboard - Angular + Spring Boot + PostgreSQL.",
    size: 9,
    color: MUTED,
  },
  { text: "Real-Time Analytics Dashboard", size: 10, bold: true, gap: 6 },
  {
    text: "Live metrics over SSE, aggregation endpoints, optimized PostgreSQL queries.",
    size: 9,
    color: MUTED,
  },
  { text: "Task Management System", size: 10, bold: true, gap: 6 },
  {
    text: "Teams, boards, priorities, deadlines - layered Spring Boot backend, PostgreSQL persistence.",
    size: 9,
    color: MUTED,
  },
  { text: "Portfolio CMS Admin Panel", size: 10, bold: true, gap: 6 },
  {
    text: "Database-driven portfolio with a protected admin dashboard and full REST API.",
    size: 9,
    color: MUTED,
  },
  { text: "CONTACT", size: 13, bold: true, color: CYAN, gap: 14 },
  { text: "Web:       devportfoliox.com", size: 9.5, gap: 8 },
  { text: "Email:     hello@devportfoliox.com", size: 9.5 },
  { text: "GitHub:    github.com/devportfoliox", size: 9.5 },
  { text: "LinkedIn:  linkedin.com/in/devportfoliox", size: 9.5 },
];

/** GET /api/resume — generates and downloads the resume as a PDF. */
export async function GET() {
  const pdf = buildPdf(LINES);
  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="DevPortfolioX-FullStack-Engineer-Resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
