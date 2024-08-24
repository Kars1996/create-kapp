#!/usr/bin/env node

import UI from "./UI";
import prompts from "prompts";
import { cyan, green, red, white } from "kolorist";
import { download } from "./download";

const templateOptions = {
    "Next.js": ["Template", "APITemplate"],
    "Discord.js": ["DJS14Template", "DJS14Base"],
    General: ["NextTemplate", "APITemplate"],
};

const icons = {
    "Next.js": "▲",
    "Discord.js": "⁜",
    General: "ↂ",
};

type TemplateCategory = keyof typeof templateOptions;

async function main() {
    UI.header();
    const templateCategory: TemplateCategory = await UI.choice(
        "Which Template Category would you like to use?",
        ["Next.js", "Discord.js", "General"]
    );
    UI.bleh();
    console.log(
        `${cyan("o")}   ${icons[templateCategory]} ${cyan(
            `${templateCategory}`
        )} Templates!`
    );

    UI.bleh();
    const template = await UI.choice(
        "Which Quickstart would you like to use?",
        templateOptions[templateCategory]
    );
    UI.bleh();
    const response = await prompts({
        type: "text",
        name: "path",
        message: "Select A FilePath:",
        validate: (value: string) => {
            if (value.length == 0 || !value) {
                return `Please enter a valid path.`;
            }
            return true;
        },
    });

    UI.bleh();

    await download(response.path, template);

    UI.end();
}

main().catch((err) => console.error(red(`Error: ${err.message}`)));
