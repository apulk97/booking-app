import { Link } from "react-router-dom"

function Home() {
  const profile = JSON.parse(localStorage.getItem('profile') || '')
  const name: string = profile?.name || ''
  return (
    <>
    <div>Hi, {name}</div>
    <Link to="/signin">Sign in</Link>
    </>
  )
}

export default Home