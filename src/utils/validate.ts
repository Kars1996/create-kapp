// TODO: Validation to remove bugs

import UI from "./UI"

export default class ValidationManager {
    public static definedCheck(value: unknown): asserts value is NonNullable<typeof value> {
        if (value === undefined || value === null ) {
            UI.print(`${value as unknown as string} cannot be undefined`)
            UI.footer()
            process.exit(1)
        }
    }
    
}