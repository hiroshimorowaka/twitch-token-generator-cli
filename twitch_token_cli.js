const readline = require("readline/promises");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function generateToken(clientId, clientSecret) {
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

		const responseBody = await response.json();
		if (response.status === 200) {
			return `Your app token is: ${JSON.stringify(responseBody)}`;
		}
		return `Error: ${JSON.stringify(responseBody)}`;
	} catch (error) {
		return "Fetch error, please try again later";
	}
}

async function revokeToken(clientId, token) {
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
		return `Error: ${JSON.stringify(responseBody)}`;
	} catch (error) {
		return "Fetch error, please try again later";
	}
}
async function start() {
	while (true) {
		const validOptions = [1, 2];

		const firstOptions = await rl.question(
			"Select one option below:\n[1] Generate Token\n[2] Revoke Token\n\n",
		);
		const selectedOption = parseInt(firstOptions.trim());

		if (!selectedOption || !validOptions.includes(selectedOption)) {
			console.log("Please, select a valid option\n\n");
			continue;
		}

		if (selectedOption === 1) {
			console.log("---------------GENERATE TOKEN--------------");
			const clientId = await rl.question("Please, insert your client ID\n\n");

			const clientSecret = await rl.question(
				"Please, insert your client Secret\n\n",
			);

			console.log("Generating token...\n");

			const twitchResponse = await generateToken(
				clientId.trim(),
				clientSecret.trim(),
			);
			console.log(`${twitchResponse}\n\n`);
			continue;
		}

		if (selectedOption === 2) {
			console.log("---------------REVOKE TOKEN--------------");
			const clientId = await rl.question("Please, insert your Client ID\n\n");

			const token = await rl.question(
				"Please, insert your Token to be revoked\n\n",
			);
			console.log("Revoking your token...\n");
			const response = await revokeToken(clientId.trim(), token.trim());
			console.log(`${response}\n\n`);
		}
	}
}
start();
