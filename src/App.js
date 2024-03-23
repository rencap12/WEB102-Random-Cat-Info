import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ACCESS_KEY = process.env.REACT_APP_CAT_API_KEY;

const App = () => {
  const [catImage, setCatImage] = useState('');
  const [breedName, setBreedName] = useState('');
  const [temperament, setTemperament] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    const fetchcatImage = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
          headers: {
            "Content-Type" : "application/json",
            "x-api-key": ACCESS_KEY
          }
        });
        const { breeds } = response.data[0];
        if (breeds.length > 0) {
          const breed = breeds[0];
          setBreedName(breed.name);
          setTemperament(breed.temperament);
          setOrigin(breed.origin);
        }
        setCatImage(response.data[0].url); // Assuming the response contains an array of objects with a 'url' property
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchcatImage();
  }, []);

  return (
    <div>
      <h1>Random cat Image</h1>
      <img src={catImage} alt="Random Dog" />
      <div>
        <h2>Breed: {breedName}</h2>
        <p>Temperament: {temperament}</p>
        <p>Origin: {origin}</p>
      </div>
    </div>
  );
};

export default App;
