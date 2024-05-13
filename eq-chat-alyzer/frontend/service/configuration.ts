import { readFile, writeFile } from 'node:fs/promises';

export interface Configuration {};

export class ConfigurationManager {
    private readonly defaultConfig: Configuration = {} as Configuration;
    private readonly configJsonPath: string = './configuration.json';

    private currentConfiguration: Promise<Configuration>; 

    constructor() {
        this.loadConfiguration((error) => {
            switch(error.code) {
                case 'ENOENT':
                    this.writeConfiguration(this.defaultConfig);
                    break;
                default:
                    console.error('ERROR: Unable to load configuration file at', this.configJsonPath);
                    console.error('Message associated with the Error:', error);
            }
        });
    }

    public async get<T>(key: string): Promise<T> {
        const config = await this.currentConfiguration;
        return config[key];
    }

    private loadConfiguration(failureCallback: (error) => void): void {
        try {
            const filePath = new URL(this.configJsonPath, import.meta.url);
            this.currentConfiguration = readFile(filePath, { encoding: 'utf8' });
            this.currentConfiguration.catch(failureCallback);
        } catch (err) {
            failureCallback(err);
        }
    }

    private writeConfiguration(configuration: Configuration): void {
        console.log('writing to file');
    }
}

const testConfigurationManager = new ConfigurationManager();
// testConfigurationManager.get<string>('testValue');