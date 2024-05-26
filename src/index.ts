import { cancel, intro, isCancel } from "@clack/prompts";
import { select } from "@clack/prompts";
import { generateTokenHandler } from "./handlers/generateTokenHandler.js";
import { revokeTokenHandler } from "./handlers/revokeTokenHandler.js";

async function start() {
	intro("Twitch Token Generator CLI");
	while (true) {
		const option: "generate" | "revoke" | symbol = await select({
			message: "Choose what do you want to do?",
			options: [
				{ value: "generate", label: "Generate token" },
				{ value: "revoke", label: "Revoke token" },
			],
		});

		if (isCancel(option)) {
			cancel("Operation cancelled.");
			process.exit(0);
		}

		const availableOptions = {
			generate: generateTokenHandler,
			revoke: revokeTokenHandler,
		};
		const funToExecute = availableOptions[option as "generate" | "revoke"];
		if (funToExecute) {
			await funToExecute();
		}
	}
}
start();
