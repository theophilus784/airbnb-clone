import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function PlacesFormPage({Perks, axios, PhotosUploader}) {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [addedPhotos, setAddedPhotos] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  
  const inputHeader = (text) => {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  const inputDescription = (text) => {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  const addNewPlace = async (e) => {
    e.preventDefault()
    try{
      await axios.post('/places', {
        title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests
      })
      navigate('/account/places')
    } catch {
      console.error('Failed to add new place:', error);
    }
  }

  return (
    <div>
      <form onSubmit={addNewPlace}>
        {preInput('Title', 'Title for your place should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apartment" />
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address"/>
        {preInput('Photos', 'More = Better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Description of the place')}
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        {preInput('Perks', 'Select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>   

        {preInput('Extra Info', 'House rules, etc')}
        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
        <h2 className="text-2xl">Check in & out times</h2>
        <p className="text-gray-500 text-sm">Add check in and out times, remember to have some time window for cleaning and room between guests</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-2">Check in time</h3>
            <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14" />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Check out time</h3>
            <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="18"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Max number of guests</h3>
            <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div> 
  )
}
