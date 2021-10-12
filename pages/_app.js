import '../styles/globals.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
