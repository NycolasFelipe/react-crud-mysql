import React, { useState } from 'react'
import './card.css';
import FormDialog from '../dialog/dialog';

export default function Card(props) {
  const [open, setOpen] = useState(false);
  const handleClickCard = () => setOpen(true);

  return (
    <>
    <FormDialog 
      open={open} 
      setOpen={setOpen}
      name={props.name}
      price={props.price}
      category={props.category}
      listCard={props.listCard}
      setListCard={props.setListCard}
      id={props.id}
    />
    <div className='card-container' onClick={() => handleClickCard()}>
      <h1 className="card-title">{props.name}</h1>
      <p className='card-category'>{props.category}</p>
      <p className='card-price'>$ {props.price}</p>
    </div>
    </>
  )
}