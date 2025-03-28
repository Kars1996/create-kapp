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
        const TEST_URLS = [
            'https://www.google.com',
            'https://www.cloudflare.com',
            'https://www.github.com'
        ];
        
        const timeout = 5000;
        
        try {
            for (const url of TEST_URLS) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), timeout);
                    
                    const response = await fetch(url, {
                        method: 'HEAD',
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok) {
                        return true;
                    }
                } catch {
                    continue;
                }
            }
            
            console.log(
                `${yellow("!")}   No connection detected. Online mode disabled.`
            );
            return false;
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
