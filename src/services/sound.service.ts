import { existsSync, readFileSync } from "fs";

export interface SoundProfile {
    name: string;
    filename: string;
    volume?: number;
    emoji?: string;
}

export interface SoundRecord {
    profile: SoundProfile;
    quota: number;
}

export default class Sound {

    private soundProfiles: SoundProfile[] = []
    private soundRecords: SoundRecord[] = []
    private maxQuota: number = 4

    constructor() {
        if (!existsSync("sound-profile.json")) {
            throw new Error("sound-profile.json not found")
        }
        const data = JSON.parse(readFileSync("sound-profile.json", "utf-8"))
        const profiles = data.soundProfiles as SoundProfile[]
        this.soundProfiles = profiles
        this.soundRecords = profiles.map(p => ({
            profile: p,
            quota: this.maxQuota
        }))
    }

    randomSound(count: number = 1): SoundProfile[] {
        const result: SoundProfile[] = []
        
        // Create random pool based on each sound's quota
        const randomPool: string[] = []
        for (const record of this.soundRecords) {
            for (let i = 0; i < record.quota; i++) {
                randomPool.push(record.profile.filename)
            }
        }

        // Shuffle the random pool
        const random = randomPool.sort(() => Math.random() - 0.5)
        
        // Pick sounds from the random pool until the count is reached
        while (count > 0) {
            const filename = random.pop()
            if (!randomPool.includes(filename!)) {
                result.push(this.soundProfiles.find(p => p.filename === filename)!)
                count--
            }
        }

        // Update the quota of each sound
        const resultFilenames = result.map(r => r.filename)
        for (const record of this.soundRecords) {
            if (resultFilenames.includes(record.profile.filename) && record.quota > 1) {
                record.quota--
            } else if (record.quota < this.maxQuota) {
                record.quota++
            }
        }

        return result
    }
}