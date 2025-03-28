import { yellow, cyan, green } from "kolorist";
import { packageVersion } from "../data/consts";
import UI from "./UI";

export default class ValidationManager {
    public static definedCheck(
        value: unknown
    ): asserts value is NonNullable<typeof value> {
        if (value === undefined || value === null) {
            UI.print(`${value as unknown as string} cannot be undefined`);
            UI.footer();
            process.exit(1);
        }
    }

    public static async wifiCheck(): Promise<boolean> {
        // TODO: More Robust Check
        try {
            await fetch("google.com");
            return true;
        } catch (error) {
            return false;
        }
    }

    public static async checkForUpdates(): Promise<void> {
        try {
            const response = await fetch(
                "https://registry.npmjs.org/create-kapp/latest"
            );
            const data = await response.json();
            const latestVersion = data.version;

            if (latestVersion !== packageVersion) {
                console.log(
                    `${yellow("!")}   Update available: ${cyan(
                        latestVersion
                    )} (current: ${packageVersion})`
                );
                console.log(
                    `${cyan("o")}   Run ${green(
                        "npm i -g create-kapp@latest"
                    )} to update`
                );
                UI.bleh();
            }
        } catch (error) {}
    }
}
