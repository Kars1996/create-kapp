#!/usr/bin/env node

import { cyan, green, red, white, bold, gray } from "kolorist";
import prompts from "prompts";

export default class UI {
    // TODO: Fix terminal links
    private static readonly github = cyan("Kars1996");
    private static readonly website = cyan("kars.bio");

    public static bleh(): void {
        console.log(white(`|`));
    }
    public static header(dev: boolean): void {
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
        if (dev) {
            this.bleh();
            console.log(
                `${green("√")}   ${gray(
                    "(Dev Mode)"
                )}: Files will not be created/modified`
            );
        }
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

    public static async bool(prompt: string): Promise<boolean> {
        const response = await prompts({
            type: "toggle",
            name: "value",
            message: `  ${prompt}`,
            initial: false,
            active: "yes",
            inactive: "no",
        });
        this.bleh();

        return response.value;
    }
    public static async text(
        prompt: string,
        defaultValue?: string
    ): Promise<string> {
        const response = await prompts({
            type: "text",
            name: "value",
            message: `  ${prompt}`,
            initial: defaultValue,
            validate: (value: string) =>
                value ? true : `Please enter a valid value.`,
        });
        this.bleh();

        return response.value;
    }

    public static print(prompt: string) {
        console.log(`${cyan("o")}   ${white(bold(prompt))}`);
        this.bleh();
    }
    public static footer(): void {
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
