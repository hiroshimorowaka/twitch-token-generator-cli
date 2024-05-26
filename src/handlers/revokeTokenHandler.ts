import { cancel, group, outro, text } from "@clack/prompts";
import { revokeToken } from "../api/revokeToken.js";

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
	const revoke = await revokeToken(clientId, token);
	outro(revoke);
}
