export function log({ title, message }: { title: string; message: string }) {
	const timestamp = new Date().toLocaleString("en-US", {
		timeZone: "Asia/Bangkok",
	});
	console.log(`[${timestamp}] [${title}]: ${message}`);
}
