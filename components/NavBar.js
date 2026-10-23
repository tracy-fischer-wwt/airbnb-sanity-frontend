import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const NavBar = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (router.isReady) {
      setQuery(typeof router.query.q === "string" ? router.query.q : "")
    }
  }, [router.isReady, router.query.q])

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = query.trim()
    router.push(term ? { pathname: "/", query: { q: term } } : "/")
  }

  return (
    <div className="nav">
      <div className="logo"></div>
      <form className="search" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search places to stay"
          aria-label="Search places to stay"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  )
}

export default NavBar
