import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "Clustta",
  description: "The best way to do creative work",
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: "/icons/clustta_logo_colored.svg",
    navbar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Getting Started",
        link: "/Getting Started",
      },
    ],
  }),
  port: 8081,
});
