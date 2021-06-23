const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


var standingsData = {"Color":{}};
var scoringData = {"Name":{}};

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'config/token.json';

// Load client secrets from a local file.
fs.readFile('config/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), main);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Retreives standings data and populates standingsData.
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getStandings(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1RkoFX0uR8WFaQ6x4qG0JKy371F6da9Ua-I8ZA3yOhik',
    range: 'Standings!A2:J',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      rows.map((row) => {
        standingsData["Color"][row[9]] = {"Team": row[0], "W": row[1], "L": row[2], "T": row[3], "Pts": row[4], "GF": row[5], "GA": row[6], "GD": row[7], "Captain": row[8]};
      });
      console.log(standingsData);
      var standingsString = JSON.stringify(standingsData);
      fs.writeFile('public/data/standings.json', standingsString, function (err) {
        if (err) throw err;
        console.log('Standings written to file');
      });
    } else {
      console.log('No data found.');
    }
  });
}

/**
 * Retreives scoring data and populates scoringData.
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getScoringLeaders(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1RkoFX0uR8WFaQ6x4qG0JKy371F6da9Ua-I8ZA3yOhik',
      range: 'Scoring Leaders!A2:C',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        rows.map((row) => {
          scoringData["Name"][row[0]] = {"Team": row[1], "Goals": row[2]};
        });
        console.log(scoringData);
        var scoringString = JSON.stringify(scoringData);
        fs.writeFile('public/data/scoring.json', scoringString, function (err) {
            if (err) throw err;
            console.log('Scoring Leaders written to file');
        });
      } else {
        console.log('No data found.');
      }
    });
  }


/**
 * Runs data collection programs.
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function main(auth){
    getStandings(auth);
    getScoringLeaders(auth);
}