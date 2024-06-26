import color from "picocolors";
export async function revokeToken(clientId: string, token: string) {
	try {
		const response = await fetch(
			`https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${token}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		if (response.status === 200) {
			return "Your token has been revoked!";
		}
		const responseBody = await response.json();
		return color.red(`API Error: ${JSON.stringify(responseBody)}`);
	} catch (error) {
		return color.red("Fetch Error, please try again later");
	}
}
