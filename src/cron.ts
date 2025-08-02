import { Guild } from "discord.js";
import { rotateSoundboard } from "./actions/rotate-soundboard";
import { CronJob } from "cron";

export default class Cron {
	private guild: Guild;

	constructor(guild: Guild) {
		this.guild = guild;
	}

	init() {
		new CronJob(
			"0 0 * * 0",
			() => {
				rotateSoundboard(this.guild);
			},
			null,
			true,
			"Asia/Bangkok"
		);
	}
}
