const https = require('https');

(async () => {
  try {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/Gamer64ytb/Lemonade/releases/latest',
      method: 'GET',
      headers: {
        'User-Agent': 'nodejs' // GitHub API requires User-Agent header
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const releaseInfo = JSON.parse(data);
        const version = releaseInfo.tag_name;
        const releaseNotes = releaseInfo.body;
        const assets = releaseInfo.assets.map(asset => asset.browser_download_url);

        console.log(`Release Version: ${version}`);
        console.log(`Release Notes: ${releaseNotes}`);
        console.log(`Download Links: ${assets}`);

        // Output release information
        console.log(JSON.stringify({ version: version, releaseNotes: releaseNotes, assets: assets }));
      });
    });

    req.on('error', error => {
      console.error("Error fetching release information:", error.message);
      process.exit(1);
    });

    req.end();
  } catch (error) {
    console.error("Error fetching release information:", error.message);
    process.exit(1);
  }
})();
