#!/usr/bin/env node

import { cyan, green, red, white, bold } from "kolorist";
// import terminalLink from "terminal-link";
import prompts from "prompts";

export default class UI {
    // ! TS Compiler gets angry
    // TODO: Fix terminal links
    // TODO: Make own verson of prompts
    // private static github = cyan(
    //     terminalLink("Github", "https://github.com/Kars1996")
    // );
    // private static website = cyan(terminalLink("Websiet", "https://kars.bio"));
    private static github = cyan("Kars1996");
    private static website = cyan("kars.bio");

    public static bleh(): void {
        console.log(white(`|`));
    }
    public static header(): void {
        console.log(
            `${cyan("o")}   --------------------------------------------${cyan(
                "+"
            )}`
        );
        console.log(`|                                               |`);
        console.log(
            `|   Welcome to ${cyan("KAPP")}. Let's make your project!   |`
        );
        console.log(`|                                               |`);
        console.log(
            `${cyan("o")}   --------------------------------------------${cyan(
                "+"
            )}`
        );
        this.bleh();
    }

    public static async choice<T extends string>(
        title: string,
        options: T[]
    ): Promise<T> {
        const response = await prompts({
            type: "select",
            name: "value",
            message: `  ${title}`,
            choices: options.map((option) => ({
                title: option,
                value: option,
            })),
        });

        return response.value as T;
    }

    public static end(): void {
        console.log(
            green(
                `${cyan("o")}   ${bold("Template Successfully Initialized!")}`
            )
        );
        this.bleh();
        console.log(`${cyan("o")}   Links -------------${cyan("+")}`);
        console.log(`|                      |`);
        console.log(`|   - @${this.github}        |`);
        console.log(`|   - ${this.website}         |`);
        console.log(`|                      |`);
        console.log(`${cyan("+")}  --------------------${cyan("+")}`);
        this.bleh();
        console.log(`${cyan("+")}   Have Feedback? Dm me @ ${this.github}`);
    }

    public static feedback(): void {
        console.log(red(`+ Have Feedback? Visit my **Github**`));
    }
}
