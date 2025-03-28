import os from "os";
import { packageVersion } from "../data/consts";
import { AnalyticsEvent } from "../types";
import crypto from "crypto";

export default class AnalyticsManager {
    private static readonly _analyticsUrl: string =
        "https://kars.bio/api/cli/analytics";

    /**
     * Sends an analytics event to the API
     *
     * @author Kars1996
     * @date 2024-11-06
     * @param {any} analyticsEvent:AnalyticsEvent
     * @returns {any}
     */
    public static async sendAnalytics(
        analyticsEvent: AnalyticsEvent
    ): Promise<void> {
        const analyticsId = this.getAnalyticsId();
        const payload = {
            ...analyticsEvent,
            id: analyticsId,
            timestamp: new Date().toISOString(),
            package: "create-kapp",
            cliversion: packageVersion,
            os: os.platform(),
        };
        try {
            await fetch(this._analyticsUrl, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "api-version": "0",
                },
            });
        } catch (e) {
            ("Tomfoolery and such are not supported");
        }
    }

    private static getAnalyticsId(): string {
        const mac = this.getMacAddress();
        const salt = this.getSystemSalt();
        const hash = crypto
            .createHash("sha256")
            .update(mac + salt)
            .digest("hex");

        return [
            hash.substring(0, 4),
            hash.substring(8, 12),
            hash.substring(12, 16),
            hash.substring(16, 20),
            hash.substring(20, 24),
        ].join("-");
    }

    private static getMacAddress(): string {
        const interfaces = os.networkInterfaces();
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]!) {
                if (iface.mac && iface.mac !== "00:00:00:00:00:00") {
                    return iface.mac;
                }
            }
        }
        return "00:00:00:00:00:00";
    }

    private static getSystemSalt(): string {
        const cpu = os.cpus()[0].model;
        const hostname = os.hostname();
        return crypto
            .createHash("sha256")
            .update(cpu + hostname)
            .digest("hex");
    }
}
