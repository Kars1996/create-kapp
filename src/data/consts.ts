const templateOptions: Record<string, string[]> = {
    "Next.js": ["Template", "APITemplate"],
    "Discord.js": ["DJS14Template", "DJS14Base"],
    General: ["NextTemplate", "APITemplate"],
};

const icons: Record<string, string> = {
    "Next.js": "▲",
    "Discord.js": "§",
    General: "∂",
};

type TemplateCategory = keyof typeof templateOptions;
