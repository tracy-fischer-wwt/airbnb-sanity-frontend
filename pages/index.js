import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties, q }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>{q ? `Results for "${q}"` : "Places to stay near you"}</h1>
            {q && properties.length === 0 && <p>No places found.</p>}
            <div className="feed">
              {properties.map((property) => (
                <Link
                  key={property._id}
                  href={`property/${property.slug.current}`}
                >
                  <div className="card">
                    <img src={urlFor(property.mainImage)} />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>£{property.pricePerNight}/per Night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async ({ query: urlQuery }) => {
  const q = typeof urlQuery.q === "string" ? urlQuery.q.trim() : ""

  // Case-insensitive "contains" match on title; the term is passed as a
  // GROQ parameter so user input is never interpolated into the query.
  const query = q
    ? '*[ _type == "property" && title match $term ]'
    : '*[ _type == "property"]'
  const params = q ? { term: `*${q}*` } : {}
  const properties = await sanityClient.fetch(query, params)

  return {
    props: {
      properties: properties || [],
      q,
    },
  }
}

export default Home
