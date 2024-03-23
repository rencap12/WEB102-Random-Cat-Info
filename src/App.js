import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [catData, setCatData] = useState({
    name: "",
    weight: "",
    origin: "",
  });
  const [catImage, setCatImage] = useState('');

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const imageDataResponse = await axios.get('https://api.thecatapi.com/v1/images/search?&has_breeds=true&limit=1', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_CAT_API_KEY
          },
        });

        const imageData = imageDataResponse.data[0];
        setCatImage(imageData);

        if (!imageData) return;

        const catDataResponse = await axios.get(`https://api.thecatapi.com/v1/images/${imageData.id}/breeds`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_CAT_API_KEY
          }
        });

        const catData = catDataResponse.data[0];
        setCatData({
          name: catData.name,
          weight: catData.weight.imperial,
          origin: catData.origin
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCatData();
  }, []);

  const newSet = async () => {
    try {
      const imageDataResponse = await axios.get('https://api.thecatapi.com/v1/images/search?&has_breeds=true&limit=1', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_CAT_API_KEY
        },
      });

      const imageData = imageDataResponse.data[0];
      setCatImage(imageData);

      if (!imageData) return;

      const catDataResponse = await axios.get(`https://api.thecatapi.com/v1/images/${imageData.id}/breeds`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_CAT_API_KEY
        }
      });

      const catData = catDataResponse.data[0];
      setCatData({
        name: catData.name,
        weight: catData.weight.imperial,
        origin: catData.origin
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='infoDisplay'>
      <h1>Random Cat Information</h1>
      <div className='infoCard'>
        {catData && (
          <div>
            <p><span className="infoLabel">Name: {catData.name}</span></p>
            <p><span className="infoLabel">Weight: {catData.weight}</span></p>
            <p><span className="infoLabel">Origin: {catData.origin}</span></p>
          </div>
        )}
      </div>
      <img src={catImage.url} alt="Random Cat" style={{ height: '250px', width: '250px' }} />
      <div className="buttonContainer">
        <button className='buttonPress' onClick={newSet}>Press For a Different One</button>
      </div>
    </div>
  );
};

export default App;
