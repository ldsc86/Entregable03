import { useEffect, useState } from 'react'
import { useFetchApi } from './hooks/useFetchApi'
import { getRandomLocationById } from './lib/utils'
import Location from './components/Location'
import Residents from './components/Residents'
import Search from './components/Search'
import './App.css'

const BASE_URL = 'https://rickandmortyapi.com/api/location/'

function App() {
  const { fetchingData, data: location, loading } = useFetchApi()
  const [locationId, setLocationId] = useState(getRandomLocationById())

  useEffect(() => {
    fetchingData(`${BASE_URL}${locationId}`)
  }, [locationId])

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

        {/*Loccation Section*/}
        <section className='section'>
          <div className='container'>
            {loading ? <h2>Loading...</h2> : <Location location={location} />}
          </div>
        </section>

        {/*Residents section*/}
        <section className='section'>
          <div className='container'>
            {location && <Residents residents={location.residents} />}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
