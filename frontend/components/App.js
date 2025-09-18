import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {

    const [dogs, setDogs] = useState([])
    const [dogBreeds, setDogBreeds] = useState([])

    useEffect(() => {
      fetchDogs() 
      fetchBreeds()
    },[])

    const fetchDogs = () => {
       fetch('/api/dogs')
         .then(res => {
          if(!res.ok){
            throw new Error('Network response was not OK')
          }
          const contentType = res.headers.get('Content-Type')
            if(contentType.includes('application/json')){
              // parse the response body JSON
              // return a new promise
              return res.json()
            }
         })
         .then(data => {
          console.log(data)
          setDogs(data)
         })
         .catch(err => console.error('Failed to GET dogs', err))
    }

    const fetchBreeds = () => {
       fetch('/api/dogs/breeds')
         .then(res => {
            if(!res.ok){
              throw new error('Network failed breeds not OK')
            }
            const contentType = res.headers.get('Content-Type')
              if (contentType.includes('application/json')){
                return res.json()
              }
         })
         .then(data => {
          console.log('Dog Breeds: ',data)
          setDogBreeds(data)
         })
         .catch(err => console.error('Failed to Get dogBreeds', err))
    }
    
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList />} />
        <Route path="/form" element={<DogForm />} />
      </Routes>
    </div>
  )
}
