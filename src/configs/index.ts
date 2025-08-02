import { readFileSync } from "fs";

export interface Config {
    guildId: string;
}

export const config: Config = JSON.parse(readFileSync("config.json", "utf-8"))