var consumer_key = 'erFxlkBXTw832JeGbAs9ZFE1a';
var consumer_secret = 'eBY8XQnQU02VzxRFh8KiPXsCC0I2UsVb7rWqrdvTzGchJVExYW';

var OAuth = require('oauth');

const apiKey = 'erFxlkBXTw832JeGbAs9ZFE1a';
const apiSecretKey = 'eBY8XQnQU02VzxRFh8KiPXsCC0I2UsVb7rWqrdvTzGchJVExYW';

const oa = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  apiKey,
  apiSecretKey,
  '1.0',
  '',
  'HMAC-SHA1'
);


const popup = () => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <div id="content">
      <button onClick={() => {
        oa.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
          console.log(results);
          console.log(error);
          console.log('oauthtoken', oAuthToken)
          console.log("oauthtoken secret",oAuthTokenSecret)
        })
      }}>点击</button>
    </div>
  );
};

export default popup;
