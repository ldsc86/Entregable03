import { useEffect, useState } from 'react'
import { useFetchApi } from './hooks/useFetchApi'
import { getRandomLocationById } from './lib/utils'
import Location from './components/Location'
import Residents from './components/Residents'
import Search from './components/Search'
import './App.css'

const BASE_URL = 'https://rickandmortyapi.com/api/location/'
const RESIDENTS_PER_PAGE = 6

function App() {
  const { fetchingData, data: location, loading } = useFetchApi()
  const [locationId, setLocationId] = useState(getRandomLocationById())
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchingData(`${BASE_URL}${locationId}`)
    setPage(1)
  }, [locationId])


  const paginatedResidents = location?.residents?.slice(
    (page - 1) * RESIDENTS_PER_PAGE,
    page * RESIDENTS_PER_PAGE
  ) || []

  const totalPages = location?.residents
    ? Math.ceil(location.residents.length / RESIDENTS_PER_PAGE)
    : 1

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  return (
    <>
      <header className='header'>
        <div className="logo-container">
          <img src="/portal.png" alt="Portal" className="logo-bg" />
          <img src="/logo.png" alt="Logo" className="logo" />
          <img src="/RaM.png" alt="RaM" className="ram-logo" />
        </div>
        <img src="/portalPiso.png" alt="Portal Piso" className="portal-piso" />
        <img src="/MrM.png" alt="MrM" className="mrm-img" />
      </header>
      <main>
        {/*Search Section*/}
        <section className='section'>
          <div className='container'>
            <Search onSearch={setLocationId} />
          </div>
        </section>

        {/*Location Section*/}
        <section className='section'>
          <div className='container'>
            {loading ? <h2>Loading...</h2> : <Location location={location} />}
          </div>
        </section>

        {/*Residents section*/}
        <section className='section'>
          <div className='container'>
            {location && (
              <>
                <Residents residents={paginatedResidents} />
                {location.residents.length > RESIDENTS_PER_PAGE && (
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <button
                      className="pagination-btn"
                      onClick={handlePrev}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    <span className="pagination-info">Page {page} of {totalPages}</span>
                    <button
                      className="pagination-btn"
                      onClick={handleNext}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
