// ? Types Here
export type AnalyticsEvent =
    | {
          eventName: "cli_started";
      }
    | {
          eventName: "cli_completed";
          template: string;
      }
    | {
          eventName: "cli_selection_complete";
          template: string;
      }
    | {
          eventName: "cli_failed";
          template: string;
      };

export type AnalyticsEventWithCommonProperties = AnalyticsEvent & {
    id: string;
    timestamp: Date;
    os: string;
    cliversion: string;
};

type PackageManagers = "npm" | "pnpm" | "deno" | "bun";

export type ConfigOptions = {
    projectName: string;
    template: string;
    online: boolean;
    analytics: boolean;
    path: string;
    isDev: boolean;
    packageManager: PackageManagers;
};

export const BaseConfig: ConfigOptions = {
    projectName: "kars-project",
    template: "template",
    online: true,
    analytics: true,
    path: ".",
    isDev: true,
    packageManager: "npm",
};

export const ConfigFlags: Record<keyof ConfigOptions, string[]> = {
    projectName: ["--projectName", "-p"],
    template: ["--template", "-t"],
    online: ["--online"],
    analytics: ["--analytics"],
    path: ["--path", "-d"],
    isDev: ["--dev", "-test"],
    packageManager: ["--use", "-pm"],
};
