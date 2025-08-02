import fs from "fs";

const soundFiles = fs.readdirSync("./sounds");

const data = {
    soundProfiles: soundFiles.filter((file) => file !== ".gitkeep").map((file) => {
        return {
            name: file.split(".")[0],
            filename: file,
            volume: 1.0,
            emoji: "🔊",
            isActive: true,
        };
    }),
};

fs.writeFileSync("sound-profile-template.json", JSON.stringify(data, null, 2));

console.log(`Sound profile template generated successfully with ${data.soundProfiles.length} sound profiles`);
console.log(`File saved to "sound-profile-template.json". Please rename it to "sound-profile.json".`);