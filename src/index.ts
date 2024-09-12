#!/usr/bin/env node

import UI from "./UI";
import prompts from "prompts";
import { cyan, green, red, white } from "kolorist";
import { download } from "./download";
import * as fs from "fs";
import { exec } from "child_process";

const templateOptions = {
    "Next.js": ["Template", "APITemplate"],
    "Discord.js": ["DJS14Template", "DJS14Base"],
    General: ["NextTemplate", "APITemplate"],
};

const icons = {
    "Next.js": "▲",
    "Discord.js": "§",
    General: "∂",
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
        initial: ".",
        name: "path",
        message: "  Select A FilePath:",
        validate: (value: string) => {
            if (value.length == 0 || !value) {
                return `Please enter a valid path.`;
            }
            return true;
        },
    });

    UI.bleh();
    try {
        await download(response.path, template);
    } catch {
        console.error(red("Failed to download template."));
        UI.feedback();
        process.exit(1);
    }

    if (fs.existsSync(".git")) {
        const response = await prompts({
            type: 'toggle',
            name: 'value',
            message: '  Would you like to commit these changes?',
            initial: true,
            active: 'yes',
            inactive: 'no'
        });

        if (response.value) {
            await exec("git add .", (err) => {
                if (err) {
                    console.error("Error adding files to git:", err);
                    return;
                }

                exec(
                    'git commit -m "🚀Initialised Repository" -m "Powered by create-kapp"',
                    (commitErr) => {
                        if (commitErr) {
                            console.error(
                                red(`Error committing changes: ${commitErr}`)
                            );
                            return;
                        }
                        UI.bleh();
                        UI.print("Commited to repository sucessfully!")
                        return;
                    }
                );
            });
        } else {
            UI.bleh()
        }
    }
    UI.end();
}

main().catch((err) => console.error(red(`Error: ${err.message}`)));
