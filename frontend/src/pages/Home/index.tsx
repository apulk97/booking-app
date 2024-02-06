import { Link } from "react-router-dom"

function Home() {
  const profile = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '')
  const name: string = profile?.name || ''
  return (
    <>
    {Boolean(name) && <div>Hi, {name}</div>}
    <Link to="/signin">Sign in</Link>
    </>
  )
}

export default Home