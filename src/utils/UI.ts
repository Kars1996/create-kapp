#!/usr/bin/env node

import { cyan, green, white, bold, gray, yellow } from "kolorist";
import prompts from "prompts";
import { version as packageVersion } from "../../package.json";
import { ARG_CONFIG } from "./exports";

export default class UI {
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

    public static showHelp(): void {
        console.log();
        console.log(
            `${cyan("o")}   Available commands: ${gray(`v${packageVersion}`)}`
        );
        console.log(`${cyan("+")}   ---------------${cyan("+")}`);
        console.log(`|`);

        const argsList = Object.entries(ARG_CONFIG).map(([arg, config]) => {
            const mainArg = `--${arg}${
                config.type === "string" ? "=<value>" : ""
            }`;
            const alias = config.alias ? `, -${config.alias}` : "";
            return {
                command: `${mainArg}${alias}`,
                description: config.description,
                default: config.default,
            };
        });

        const longestCommand = Math.max(
            ...argsList.map((item) => item.command.length)
        );
        const PADDING_AFTER_COMMAND = 4;

        argsList.forEach(({ command, description, default: defaultValue }) => {
            const padding = " ".repeat(
                longestCommand - command.length + PADDING_AFTER_COMMAND
            );
            const line = `|   ${gray(command)}${padding}${description}${
                defaultValue
                    ? gray(` (default: ${cyan(defaultValue.toString())})`)
                    : ""
            }`;

            console.log(line);
        });

        console.log(`|`);
        console.log(`${cyan("+")}   ---------------${cyan("+")}`);
    }
    private static getThemeColors(): { primary: string; secondary: string } {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if (month === 10) {
            return {
                primary: "\x1b[38;2;255;140;0m", // Orange
                secondary: "\x1b[38;2;75;0;130m", // Purple
            };
        }

        if (month === 12) {
            return {
                primary: "\x1b[38;2;255;0;0m", // Red
                secondary: "\x1b[38;2;0;128;0m", // Green
            };
        }

        return {
            primary: "\x1b[36m",
            secondary: "\x1b[37m",
        };
    }
}
