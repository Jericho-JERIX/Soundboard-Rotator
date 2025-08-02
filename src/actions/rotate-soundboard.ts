import { Guild } from "discord.js"
import { createReadStream } from "fs"
import Sound from "../services/sound.service"
import { log } from "../utils/log"

export async function rotateSoundboard(guild: Guild) {
    const s = new Sound()
    const soundPool = s.randomSound(8)

    await Promise.all(guild.soundboardSounds.cache.map(sound => sound.delete()))

    for (const sound of soundPool) {
        guild.soundboardSounds.create({
            name: sound.name,
            file: createReadStream(`./sounds/${sound.filename}`),
            volume: 1.0,
            emojiName: sound.emoji || undefined
        })
    }

    log({
        title: "Action: Rotate Soundboard",
		message: `Added '${soundPool.map((s) => s.name).join(", ")}' to server ${guild.name}`,
	});
}