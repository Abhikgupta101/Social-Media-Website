import '../styles/globals.css'
import './signup.css'
import './login.css'
import '../components/Feed.css'
import Context from '../context/Context'
function MyApp({ Component, pageProps }) 
{
  return (
  <Context>
  <Component {...pageProps} />
  </Context>
  )

}

export default MyApp
