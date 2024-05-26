export async function generateToken(clientId: string, clientSecret: string) {
	try {
		const response = await fetch(
			`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const responseBody = (await response.json()) as {
			token: string;
		};
		if (response.status === 200) {
			return `Your app token is: ${responseBody.token}`;
		}
		return `API Error: ${JSON.stringify(responseBody)}`;
	} catch (error) {
		return "Fetch error, please try again later";
	}
}
