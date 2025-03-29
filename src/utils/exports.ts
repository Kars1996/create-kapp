export interface ArgConfig {
    alias?: string;
    description: string;
    type: 'string' | 'boolean' | "multi";
    default?: string | boolean;
}

export type Args = Record<string, string | boolean>;

export const ARG_CONFIG: Record<string, ArgConfig> = {
    'version': {
        alias: 'v',
        description: 'Show CLI version',
        type: 'boolean'
    },
    'help': {
        alias: 'h',
        description: 'Show this help message',
        type: 'boolean'
    },
    'dl': {
        description: 'Download specific template',
        type: 'string'
    },
    'online': {
        alias: 'o',
        description: 'Download from online repository',
        type: 'boolean',
        default: true
    },
    'use': {
        description: 'Use specific package manager',
        type: 'string',
        default: 'npm'
    },
    'path': {
        description: 'Specify installation path',
        type: 'string',
        default: '.'
    },
    'name': {
        description: 'Set project name',
        type: 'string',
        default: 'kars-project'
    },
    'config': {
        alias: 'c',
        description: "Manage CLI configuration",
        type: 'multi',
    },
} as const;