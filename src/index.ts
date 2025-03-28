#!/usr/bin/env node

import UI from "./utils/UI";
import Setup from "./lib/setup";
import { cyan, red } from "kolorist";
import { download } from "./lib/download";
import * as fs from "fs";
import { TemplateCategory, icons, templateOptions } from "./data/consts";
import ValidationManager from "./utils/validate";
import AnalyticsManager from "./utils/analytics";
import { version as packageVersion } from "../package.json";
import { Args, ARG_CONFIG } from "./utils/exports";

const isDev: boolean = process.argv.includes("--dev");

function parseArgs(): Args {
    const args: Args = {};

    Object.entries(ARG_CONFIG).forEach(([key, config]) => {
        if (config.default !== undefined) {
            args[key] = config.default;
        }
    });

    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];

        if (arg.startsWith("--")) {
            const [key, value] = arg.slice(2).split("=");
            const config = ARG_CONFIG[key];

            if (config) {
                args[key] = config.type === "boolean" ? true : value || "";
            }
        } else if (arg.startsWith("-")) {
            const key = arg.slice(1);

            const mainArg = Object.entries(ARG_CONFIG).find(
                ([_, config]) => config.alias === key
            )?.[0];

            if (mainArg) {
                const config = ARG_CONFIG[mainArg];
                args[mainArg] =
                    config.type === "boolean" ? true : process.argv[++i] || "";
            }
        }
    }

    return args;
}

async function main() {
    const args = parseArgs();

    if (args.version || args.v) {
        console.log(`${cyan("o")}   KAPP CLI version: ${packageVersion}`);
        process.exit(0);
    }

    if (args.help || args.h) {
        UI.showHelp();
        process.exit(0);
    }

    const prefilledPath = typeof args.path === "string" ? args.path : ".";
    const prefilledName =
        typeof args.name === "string" ? args.name : "kars-project";

    await ValidationManager.checkForUpdates();

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

    const response = await UI.text("Select a filePath", prefilledPath);

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
        prefilledName
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
