import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties, searchTerm }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>
              {searchTerm
                ? `Results for "${searchTerm}"`
                : "Places to stay near you"}
            </h1>
            {searchTerm && properties.length === 0 && (
              <p>No places match your search.</p>
            )}
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
            {properties.length > 0 && <DashboardMap properties={properties} />}
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async ({ query: urlQuery }) => {
  const searchTerm = typeof urlQuery.q === "string" ? urlQuery.q.trim() : ""

  const properties = searchTerm
    ? await sanityClient.fetch(
        '*[ _type == "property" && title match $term ]',
        { term: `*${searchTerm}*` }
      )
    : await sanityClient.fetch('*[ _type == "property"]')

  return {
    props: {
      properties: properties || [],
      searchTerm,
    },
  }
}

export default Home
