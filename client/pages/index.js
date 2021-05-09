import axios from 'axios'

const landingPage = ({ currentUser }) => {
  console.log(currentUser)
  return <h1 style={{ color: color }}>Landing Page</h1>
}

landingPage.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser')

  return response.data
}

export default landingPage
