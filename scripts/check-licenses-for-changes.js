/*
  This script contains a Map from URLs to a sha256 hash (that is that hash of the page content that can be found at this URL).

  In our application, there is a license page. 
  On this page, we list all external dependencies (npm packages, Capacitor plugins, etc.) and their corresponding license texts.
  These dependencies might change over time, and most importantly: Their license text might change.
  We should be careful with this since we update our dependencies pretty often and might miss such a license change.

  This script helps us to identify which licenses were changed: 
  If the hash is the same, the license text has obviously not changed. But if the hash is different, the license text has been changed and thus, we need to check if we need to update our license page.

  So: We should check this script from time to time.

  Important: This script does not automatically update anything. It only displays whether a license text has changed. In this case, we need to manually (!) update the license page.
*/

const https = require('https');
const crypto = require('crypto');

const util = require('./util');

const URL_TO_HASH_MAP = {
  'https://raw.githubusercontent.com/angular/angular/master/LICENSE':
    '1d65ce0e0d6f0f237eeeb8fa186402ec8c6169d05ddadac6bcf9fa683eb5b34b',

  'https://raw.githubusercontent.com/ionic-team/ionic-framework/main/LICENSE':
    'fa8725a0baf2a84788bd5e34f99ae64b7ea256a5c037ff37761180e0c5ece28a',
  'https://raw.githubusercontent.com/ionic-team/capacitor/main/LICENSE':
    'fa8725a0baf2a84788bd5e34f99ae64b7ea256a5c037ff37761180e0c5ece28a',

  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/app/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',
  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/haptics/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',
  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/keyboard/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',
  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/local-notifications/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',
  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/splash-screen/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',
  'https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/status-bar/LICENSE':
    'e8f989836e88732576472006444b65fd3d7d3c2455becdaaa4d82cd0dd43110f',

  'https://raw.githubusercontent.com/microsoft/TypeScript/main/LICENSE.txt':
    'a7d00bfd54525bc694b6e32f64c7ebcf5e6b7ae3657be5cc12767bce74654a47',
};

checkURLs();

async function checkURLs() {
  for (const [url, oldHash] of Object.entries(URL_TO_HASH_MAP)) {
    const data = await performRequest(url);

    const newHash = crypto
      .createHash('sha256')
      .update(data, 'utf8')
      .digest('hex');

    if (oldHash === newHash) {
      util.logDefault(`${url} is ok`);
      continue;
    }

    util.logError(
      `${url} has a new hash. Stopping the processing. The new hash: ${newHash}`,
    );
    process.exit(1);
  }
}

function performRequest(url) {
  return new Promise((resolve) => {
    https
      .get(url, (result) => {
        const statusCode = result.statusCode;
        if (statusCode !== 200) {
          util.logError(
            `Stopping because the following URL returned status code ${statusCode}: ${url}`,
          );
          process.exit(1);
        }

        let rawData = '';

        result.on('data', (chunk) => {
          rawData += chunk;
        });

        result.on('end', () => {
          resolve(rawData);
        });
      })
      .on('error', () => {
        util.logError(
          `Stopping because an error occurred while processing the following URL: ${url}`,
        );
        process.exit(1);
      });
  });
}
