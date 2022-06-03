import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import Card from './components/card/card';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState([]);

  const handleChangeValues = (e) => {
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      price: values.price,
      category: values.category,
    }).then(() => {
      setListGames([
        ...listGames,
        {
          id: values.id,
          name: values.name,
          price: values.price,
          category: values.category,
        }
      ]);
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/get-cards").then(response => {
      setListGames(response.data);
    })
  }, [])
  
  return (
    <div className='app-container'>
      <div className='register-container'>
        <h1 className="register-title">Game Store</h1>
        <input 
          name="name" 
          type="text" 
          className="register-input"
          placeholder="Name"
          onChange={(e) => handleChangeValues(e)}
          />
        <input 
          name="price" 
          type="text" 
          className="register-input"
          placeholder="Price"
          onChange={(e) => handleChangeValues(e)}
          />
        <input 
          name="category" 
          type="text" 
          className="register-input"
          placeholder="Category"
          onChange={(e) => handleChangeValues(e)}
        />
        <button 
          className="register-button"
          onClick={() => handleClickButton()}
          >Register
        </button>
      </div>
      {
        typeof listGames !== "undefined" &&
        listGames.map((value) => {
          return (
            <Card 
              key={value.id}
              listCard={listGames}
              setListCard={setListGames}
              id={value.idgames}
              name={value.name}
              price={value.price}
              category={value.category}
            />
          )
        })
      }
    </div>
  );
}

export default App;
