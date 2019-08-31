import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';

const JokeList = () => {
  const [jokes, setJokes] = useState([]);

  const baseUrl = 'http://localhost:3300/api';

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseUrl}/jokes`)
      .then(response => {
        setJokes(response.data);
      })
      .catch(error => {
        console.log('Error fetching jokes');
      })
  }, [])

  return (
    <div>
      {jokes.map(item => <div key={item.id}>{item.joke}</div>)}
    </div>
  )
}

export default JokeList;