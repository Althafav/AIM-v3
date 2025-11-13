// lib/seo.ts
import { SITE_NAME, SITE_URL } from "@/modules/Globals";

export function buildMetadata({
  title,
  description,
  image = "/assets/logos/logo.png",
  canonical = SITE_URL,
}: {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
}) {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}
