import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EachSymbol from '../EachSymbol/EachSymbol';
import './PriceModal.css';
import ToggleButton from '../ToggleButton/ToggleButton';
import { ReactComponent as SearcgIcon } from '../../assets/magnifying-glass-solid.svg';
import { ReactComponent as CloseIcon } from '../../assets/xmark-solid.svg';

export interface Icoin {
  symbol: string;
  current_price: string;
  name : string;
  icon_name :string;
}

const PriceModal = () => {
  const [firstFiveCoin, setFirstFiveCoin] = useState([]);
  useEffect(() => {
    axios
      .get('https://pricing-nl.skyvest.net/api/v1/core/binance/symbols/')
      .then((res) => {
        setFirstFiveCoin(res.data.slice(0, 5));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="modal">
      <div className="modal__heading">
        <h3>Create Position</h3>
        <CloseIcon />
      </div>
      <ToggleButton />
      <div className="modal__input">
        <SearcgIcon />
        <input value={''} placeholder={'Search a Symbol'} onChange={()=>{}}/>
      </div>
      <div className="modal__prices">
        {firstFiveCoin.map((eachCoin: Icoin , index : number) => {
          return <EachSymbol key={eachCoin.symbol} coin={eachCoin} index={index}/>;
        })}
      </div>
    </div>
  );
};

export default PriceModal;
