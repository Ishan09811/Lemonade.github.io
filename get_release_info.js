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
        const githubLink = releaseInfo.html_url;

        // Pass release information to the next step
        console.log(JSON.stringify({ version: version, releaseNotes: releaseNotes, githubLink: githubLink }));
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
