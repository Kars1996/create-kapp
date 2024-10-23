import { version as packageVersionImport } from "../../package.json";

export const templateOptions: Record<string, string[]> = {
    "Next.js": ["Template", "APITemplate"],
    "Discord.js": ["DJS14Template", "DJS14Base"],
    General: ["NextTemplate", "APITemplate"],
};

export const icons: Record<string, string> = {
    "Next.js": "▲",
    "Discord.js": "§",
    General: "∂",
};

export type TemplateCategory = keyof typeof templateOptions;

export const packageVersion = packageVersionImport;
