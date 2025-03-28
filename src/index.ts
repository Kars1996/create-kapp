#!/usr/bin/env node

import UI from "./utils/UI";
import Setup from "./lib/setup";
import { cyan, red } from "kolorist";
import { download } from "./lib/download";
import * as fs from "fs";
import { TemplateCategory, icons, templateOptions } from "./data/consts";
import ValidationManager from "./utils/validate";
import AnalyticsManager from "./utils/analytics";

const isDev: boolean = process.argv.includes("--dev");

async function main() {
    UI.header(isDev);
    AnalyticsManager.sendAnalytics({ eventName: "cli_started" });

    const templateCategory: TemplateCategory = await UI.choice(
        "Which Template Category would you like to use?",
        Object.keys(templateOptions) as (keyof typeof templateOptions)[]
    );
    ValidationManager.definedCheck(templateCategory);
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

    const response = await UI.text("Select a filePath", ".");

    try {
        if (!isDev) {
            await download(response, template);
        }
    } catch {
        console.error(red("Failed to download template."));
        UI.footer();
        process.exit(1);
    }

    const useNPM = await UI.bool(
        "Would you like to use NPM to install packages?"
    );
    if (useNPM) {
        await Setup.NPMinstall();
    }

    const name = await UI.text(
        "What do you want your project called?",
        "kars-project"
    );
    await Setup.editName(name);

    if (fs.existsSync(".git")) {
        const commitResponse = await UI.bool(
            "Would you like to commit these changes?"
        );
        if (commitResponse) {
            const commitSuccess = await Setup.commit();
            if (commitSuccess) {
                UI.bleh();
                UI.print("Commited to repository successfully!");
            }
        } else {
            UI.bleh();
        }
    } else {
        if (await UI.bool("Would you like to init a git repo?")) {
            await Setup.initGitRepo();
        }
    }

    UI.footer();
}

main().catch((err) => console.error(red(`Error: ${err.message}`)));
