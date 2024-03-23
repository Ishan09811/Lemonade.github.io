const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

(async () => {
  const { data: releaseInfo } = await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
    owner: "Gamer64ytb",
    repo: "Lemonade"
  });

  const version = releaseInfo.tag_name;
  const releaseNotes = releaseInfo.body;
  const assets = releaseInfo.assets.map(asset => asset.browser_download_url);

  console.log(`Release Version: ${version}`);
  console.log(`Release Notes: ${releaseNotes}`);
  console.log(`Download Links: ${assets}`);

  // Output release information
  console.log(JSON.stringify({ version: version, releaseNotes: releaseNotes, assets: assets }));
})();
