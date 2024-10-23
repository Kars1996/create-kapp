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
