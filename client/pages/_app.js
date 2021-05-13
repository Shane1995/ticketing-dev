import Head from 'next/head'
import buildClient from '../api/buildClient'

import Header from '../components/Header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Head>
        // Responsive meta tag
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        // bootstrap CDN
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1'
          crossorigin='anonymous'
        />
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW'
          crossorigin='anonymous'
        ></script>
      </Head>

      <Header currentUser={currentUser} />
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    ...data
  }
}

export default AppComponent
