import Image from "next/image";
import { basePath } from "@/lib/site";

export function Photo({
  slug,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  slug: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`${basePath}/images/${slug}.jpg`}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover grayscale ${className}`}
    />
  );
}
