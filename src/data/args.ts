import { ConfigOptions, ConfigFlags, BaseConfig } from "../types";
import { packageVersion } from "./consts";

export default class ArgsManager {
    private static readonly configOptions: ConfigOptions = BaseConfig;
    private static readonly version: string = packageVersion;

    public static getArgs(): Record<string, string | boolean> {
        const args: Record<string, string | boolean> = {
            ...this.configOptions,
            V: this.version,
        };
        return args;
    }

    public static getCleanArgsArray(): string[] {
        const argsArray: string[] = [];

        for (const [key, value] of Object.entries(this.configOptions)) {
            const flags = ConfigFlags[key as keyof ConfigOptions];
            if (flags) {
                const flag = flags[0];
                argsArray.push(`${flag}=${value}`);
            }
        }

        argsArray.push(`-V=${this.version}`);

        return argsArray;
    }

    public static parseArgs(): Record<string, string | boolean> {
        const args: Record<string, string | boolean> = {
            ...this.configOptions,
        };

        process.argv.forEach((arg) => {
            if (arg.startsWith("--") || arg.startsWith("-")) {
                const [flag, value] = arg.split("=");
                for (const [key, flags] of Object.entries(ConfigFlags)) {
                    if (flags.includes(flag)) {
                        args[key as keyof ConfigOptions] = value || true;
                    }
                }
                if (flag === "-V" || flag === "--version") {
                    args["V"] = this.version;
                }
            }
        });

        return args;
    }
}
