import ResidentCard from "./ResidentCard"
import './Residents.css'

function Residents({ residents }) {
    return (
        <>
            <div className="residents">
                {residents.map((resident) => (
                    <ResidentCard key={resident} url={resident} />
                ))}

            </div>
            {residents.length === 0 && <p className="not--found">Not residents found</p>}
        </>
    )
}
export default Residents