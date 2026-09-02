import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const noirlyFontClassName = `${hanken.variable} ${fraunces.variable} ${jetbrains.variable}`;

export { fraunces, hanken, jetbrains };
