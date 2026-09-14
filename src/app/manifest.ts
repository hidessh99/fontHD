import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoVPN - Enterprise Tunneling & Cloud Infrastructure",
    short_name: "GoVPN",
    description:
      "High-speed multi-protocol VPN tunneling, DNS manager, and AI gateway.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#0052ff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
