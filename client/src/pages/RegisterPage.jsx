import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/register', {
        name,
        email,
        password
      })
      alert('Registration successful')
    } catch (e) {
      alert('Registration failed')
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form action="" className='max-w-md mx-auto' onSubmit={registerUser}>
          <input 
            type="text" 
            placeholder='John Doe' 
            value={name} 
            onChange={(e) => {setName(e.target.value)}} 
          />
          <input 
            type="email" 
            placeholder='example@gmail.com'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already registered? <Link className="underline text" to={'/login'}>Click here to login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
