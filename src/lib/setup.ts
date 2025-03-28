#!/usr/bin/env node

import * as fs from "fs";
import { exec } from "child_process";
import { red, cyan } from "kolorist";
import UI from "../utils/UI";

export default class Setup {
    public static async initGitRepo(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (fs.existsSync(".git")) {
                UI.print("Git repository already exists.");
                return resolve(true);
            }

            const name = await UI.text("Enter a name for the repository");

            console.log("Initializing Git repository...");
            exec("git init", (err) => {
                if (err) {
                    console.error(
                        red("Error initializing Git repository:"),
                        err
                    );
                    return reject(false);
                }

                if (fs.existsSync("package.json")) {
                    try {
                        const packageData = fs.readFileSync(
                            "package.json",
                            "utf-8"
                        );
                        const packageJson = JSON.parse(packageData);
                        packageJson.repository = {
                            type: "git",
                            url: `git@github.com:kars1996/${name}.git`,
                        };
                        fs.writeFileSync(
                            "package.json",
                            JSON.stringify(packageJson, null, 2),
                            "utf-8"
                        );
                        UI.print(
                            `Added repository info to package.json: ${cyan(
                                name
                            )}`
                        );
                    } catch (writeErr) {
                        console.error(
                            red("Error writing repository to package.json"),
                            writeErr
                        );
                        return reject(false);
                    }
                }

                UI.print("Git repository initialized successfully.");
                resolve(true);
            });
        });
    }
    public static async commit(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            exec("git add .", (err) => {
                if (err) {
                    console.error(red("Error adding files to git:"), err);
                    return reject(false);
                }
                exec(
                    'git commit -m "🚀Initialised Repository" -m "Powered by create-kapp"',
                    (commitErr) => {
                        if (commitErr) {
                            console.error(
                                red(`Error committing changes: ${commitErr}`)
                            );
                            return reject(false);
                        }
                        resolve(true);
                    }
                );
            });
        });
    }

    public static async NPMinstall(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            UI.print("Running npm install...");
            exec("npm install", (err) => {
                if (err) {
                    console.error(red("Error running npm install"), err);
                    return reject(false);
                }
                UI.print("npm packages installed successfully.");
                resolve(true);
            });
        });
    }

    // Method to install packages using Yarn
    public static async Yarninstall(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            UI.print("Running yarn install...");
            exec("yarn install", (err) => {
                if (err) {
                    console.error(red("Error running yarn install"), err);
                    return reject(false);
                }
                UI.print("Yarn packages installed successfully.");
                resolve(true);
            });
        });
    }

    public static async editName(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const packageJsonPath = "./package.json";

            if (!fs.existsSync(packageJsonPath)) {
                console.error(red("package.json not found!"));
                return reject(false);
            }

            try {
                const packageData = fs.readFileSync(packageJsonPath, "utf-8");
                const packageJson = JSON.parse(packageData);

                const newName = name.trim().replace(/\s+/g, "-");
                packageJson.name = newName;

                fs.writeFileSync(
                    packageJsonPath,
                    JSON.stringify(packageJson, null, 2),
                    "utf-8"
                );
                UI.print(`Project name changed to: ${cyan(newName)}`);

                resolve(true);
            } catch (err) {
                console.error(red("Error updating package.json"), err);
                reject(false);
            }
        });
    }
}
