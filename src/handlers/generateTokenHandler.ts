import { cancel, group, outro, text } from "@clack/prompts";
import { generateToken } from "../api/generateToken.js";

export async function generateTokenHandler() {
	const { clientId, clientSecret } = await group(
		{
			clientId: () => text({ message: "Type your Twitch Client ID" }),
			clientSecret: () => text({ message: "Type your Twitch Client Secret" }),
		},
		{
			onCancel: () => {
				cancel("Operation cancelled.");
				return;
			},
		},
	);

	if (clientId === "canceled" || clientSecret === "canceled") {
		cancel("Operation cancelled.");
		return;
	}
	const token = await generateToken(clientId, clientSecret);
	outro(token);
}
