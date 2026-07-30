import type { ReactNode } from "react";
import {
  Braces,
  Globe,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import icons from "@/lib/brand-icons.json";

type BrandIcon = { title: string; hex: string; path: string };
const BRAND_ICONS = icons as unknown as Record<string, BrandIcon>;

/** Non-brand concepts that map to Lucide glyphs. */
const LUCIDE_FALLBACKS: Record<string, LucideIcon> = {
  rest: Globe,
  api: Braces,
  "rest-api": Globe,
  openapi: Braces,
  security: ShieldCheck,
};

function hexLuminance(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface TechIconProps {
  slug: string;
  size?: number;
  className?: string;
  /** Force monochrome (currentColor) rendering. */
  mono?: boolean;
}

/**
 * Renders a real technology brand icon (Simple Icons path data).
 * Very dark brand marks fall back to currentColor so they stay visible
 * on dark surfaces; unknown slugs resolve to a Lucide glyph.
 */
export function TechIcon({ slug, size = 20, className, mono }: TechIconProps) {
  const key = slug.toLowerCase().replace(/[\s.]+/g, "");
  const brand = BRAND_ICONS[key];

  let body: ReactNode;
  if (brand) {
    const useBrandColor = !mono && hexLuminance(brand.hex) > 0.18;
    body = (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={useBrandColor ? `#${brand.hex}` : "currentColor"}
        aria-label={brand.title}
        className={className}
      >
        <path d={brand.path} />
      </svg>
    );
  } else {
    const Fallback = LUCIDE_FALLBACKS[key] ?? Braces;
    body = (
      <Fallback
        size={size}
        strokeWidth={1.8}
        aria-label={slug}
        className={className}
      />
    );
  }
  return body;
}
