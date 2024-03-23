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
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    fetchCatData();
  }, []);

  const fetchCatData = async () => {
    try {
      let imageData, catInfo;
      do {
        imageData = await fetchCatImage();
        catInfo = await fetchCatInfo(imageData.id);
      } while (catInfo && banList.includes(catInfo.origin)); // Keep fetching until the origin is not in the ban list
      setCatImage(imageData.url);
      setCatData({
        name: catInfo.name,
        weight: catInfo.weight.imperial,
        origin: catInfo.origin
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCatImage = async () => {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?&has_breeds=true&limit=1', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_API_KEY
      }
    });
    return response.data[0];
  };

  const fetchCatInfo = async (imageId) => {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${imageId}/breeds`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_API_KEY
      }
    });
    return response.data[0];
  };

  const handleBan = (attribute) => {
    setBanList([...banList, attribute]);
    fetchCatData(); // Fetch new data after adding to ban list
  };

  return (
    <div className='infoDisplay'>
      <h1>Random Cat Information</h1>
      <div className='infoCard'>
        {catData && (
          <div>
            <p><span className="infoLabel" onClick={() => handleBan(catData.name)}>Name: {catData.name}</span></p>
            <p><span className="infoLabel" onClick={() => handleBan(catData.weight)}>Weight: {catData.weight}</span></p>
            <p><span className="infoLabel" onClick={() => handleBan(catData.origin)}>Origin: {catData.origin}</span></p>
          </div>
        )}
      </div>
      <img src={catImage} alt="Random Cat" style={{ height: '250px', width: '250px' }} />
      <div className="buttonContainer">
        <button className='buttonPress' onClick={fetchCatData}>Press For a Different One</button>
      </div>
      <div className="banList">
        <h2>Ban List</h2>
        <ul>
          {banList.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
