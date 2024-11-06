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

    public static async wifiCheck(): Promise<boolean> { // TODO: More Robust Check
        try {
            await fetch("google.com");
            return true;
        } catch (error) {
            return false;
        }
    }
}
