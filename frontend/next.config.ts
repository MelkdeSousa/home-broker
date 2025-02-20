import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["localhost", "www.google.com", "external-content.duckduckgo.com"],
	},
};

export default nextConfig;
