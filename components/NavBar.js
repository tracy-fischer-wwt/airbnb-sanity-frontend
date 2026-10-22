import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const NavBar = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  // Keep the input in sync with the current ?q= query param
  useEffect(() => {
    setSearch(typeof router.query.q === "string" ? router.query.q : "")
  }, [router.query.q])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = search.trim()
    router.push(q ? { pathname: "/", query: { q } } : "/")
  }

  return (
    <div className="nav">
      <Link href="/">
        <a className="logo" aria-label="Home"></a>
      </Link>
      <form className="search" role="search" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          name="q"
          placeholder="Search places to stay"
          aria-label="Search places to stay"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default NavBar
