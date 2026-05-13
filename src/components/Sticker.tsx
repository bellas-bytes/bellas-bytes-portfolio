import { motion } from "framer-motion";

export interface StickerConfig {
  /** Path relative to public/, e.g. "/stickers/botanical-1.png" */
  readonly src: string;
  /** Alt text for accessibility */
  readonly alt: string;
  /** CSS top position (e.g. "10%", "200px") */
  readonly top?: string;
  /** CSS bottom position */
  readonly bottom?: string;
  /** CSS left position */
  readonly left?: string;
  /** CSS right position */
  readonly right?: string;
  /** Width in px */
  readonly size?: number;
  /** Rotation in degrees */
  readonly rotation?: number;
  /** Opacity 0-1 (default 0.55) */
  readonly opacity?: number;
  /** If true, hidden on mobile (<768px) */
  readonly desktopOnly?: boolean;
}

interface StickerProps {
  readonly config: StickerConfig;
}

export default function Sticker({ config }: StickerProps) {
  const {
    src,
    alt,
    top,
    bottom,
    left,
    right,
    size = 180,
    rotation = 0,
    opacity = 0.55,
    desktopOnly = false,
  } = config;

  return (
    <motion.img
      src={process.env.PUBLIC_URL + src}
      alt={alt}
      aria-hidden
      className={`pointer-events-none fixed select-none z-10 ${desktopOnly ? "hidden md:block" : ""}`}
      style={{
        top,
        bottom,
        left,
        right,
        width: size,
        height: "auto",
        transform: `rotate(${rotation}deg)`,
        opacity,
        filter:
          "grayscale(100%) brightness(1.4) contrast(0.8) sepia(30%) hue-rotate(170deg)",
        mixBlendMode: "screen",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.2, delay: 0.3 }}
    />
  );
}
