import { cancel, group, outro, text } from "@clack/prompts";
import { generateToken } from "../api/generateToken.js";
import { spinner } from "@clack/prompts";
import color from "picocolors";
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
	const s = spinner();
	s.start("Generating Token...");
	const token = await generateToken(clientId, clientSecret);
	if (token.includes("Error")) {
		s.stop(color.red("Failed!"));
	} else {
		s.stop(color.green("Token Generated!"));
	}
	outro(token);
}
