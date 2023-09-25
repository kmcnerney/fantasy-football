import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import qs from 'qs';

async function yahooLogin(yahoo_code) {
  console.log(`authing with yahoo using code: ${yahoo_code}`)

  try {

    const proxyurl = 'https://corsproxy.io/?'
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        grant_type: 'authorization_code',
        redirect_url: 'https://kmcnerney.github.io/fantasy-football',
        client_id: 'dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk',
        client_secret: '67ff91fb2b422cd6fe3a947fe4dadb4ace874b2b'
      }),
      url: proxyurl + 'https://api.login.yahoo.com/oauth2/get_token',
    };

    const token = await axios.get(options)
    console.log(`yahoo auth succeeded and got token`, token)
    return token
  } catch (e) {
    console.error('Failed Yahoo login', e)
  }

}

function App() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const yahoo_code = params.get('code');

  if (yahoo_code) {
    yahooLogin(yahoo_code);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Guillotine League
        </p>
        <a href={'https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk&redirect_uri=https://kmcnerney.github.io/fantasy-football&response_type=code'}>
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
