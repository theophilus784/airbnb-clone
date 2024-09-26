import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";

export default function PlacesPage() {
  const {action} = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
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

  const addPhotoByLink = async () => {
    await axios.post('/upload-by-link', {link:photoLink})
  }

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput('Title', 'Title for your place should be short and catchy as in advertisement')}
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apartment" />
            {preInput('Address', 'Address to this place')}
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address"/>
            {preInput('Photos', 'More = Better')}
            <div className="flex gap-2">
              <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder={'Add using a link ....jpg'} />
              <button className="bg-gray-200 px-4 rounded-2xl">Add &nbsp; photo</button> 
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex gap-1 justify-center bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                Upload
              </button>
            </div>
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
                <input type="number" value={maxGuests} onChange={e => setMaxGuests(e => target.value)} />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div> 
      )}
    </div>
  )
}