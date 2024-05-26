import { cancel, group, outro, spinner, text } from "@clack/prompts";
import { revokeToken } from "../api/revokeToken.js";
import color from "picocolors";
export async function revokeTokenHandler() {
	const { clientId, token } = await group(
		{
			clientId: () => text({ message: "Type your Twitch Client ID" }),
			token: () => text({ message: "Type your Twitch Token" }),
		},
		{
			onCancel: () => {
				cancel("Operation cancelled.");
				return;
			},
		},
	);
	if (clientId === "canceled" || token === "canceled") {
		cancel("Operation cancelled.");
		return;
	}
	const s = spinner();
	s.start("Revoking Token...");
	const revoke = await revokeToken(clientId, token);
	if (revoke.includes("Error")) {
		s.stop(color.red("Failed!"));
	} else {
		s.stop(color.green("Finished!"));
	}

	outro(revoke);
}
