import { useState } from 'react'

const NavBar = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchInput)
  }

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="logo"></div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search locations, amenities..."
            value={searchInput}
            onChange={handleSearch}
          />
          <button type="submit" className="search-button">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default NavBar
