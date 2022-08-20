import React, { useEffect, useState } from 'react';
import BtcImg from '../../assets/btcimg.png';
import './EachSymbol.css';
import {IProps , ICoinServer} from '../../types/EachSymbol.types'

const EachSymbol = ({ coin, index }: IProps) => {
  const [Coin, setCoin] = useState<null | ICoinServer>({} as ICoinServer);
  const [ws, setWs] = useState(
    new WebSocket('wss://pricing-nl.skyvest.net/websockets/pushpin')
  );
  const [webSocketReady, setWebSocketReady] = useState(false);
  const [iconUrl, setIconUrl] = useState(
    'https://storage.skyvest.io/assets/128/' + coin.icon_name
  );
  useEffect(() => {
    const apiCall = {
      action: 'subscribe-symbol',
      symbol: coin.symbol,
      exchange: 'binance',
    };
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
      setWebSocketReady(true);
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = 'data')) {
          setCoin(json.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    ws.onclose = function (event) {
      setWebSocketReady(false);
      setTimeout(() => {
        setWs(new WebSocket('ws://127.0.0.1:3000/ws'));
      }, 1000);
    };
    ws.onerror = function (err) {
      console.log(err);
      console.log('Socket encountered error: ', 'err', 'Closing socket');
      setWebSocketReady(false);
      ws.close();
    };
  }, [ws, coin.symbol]);
  return (
    <>
      {webSocketReady ? (
        <div
          className={`symbol__info ${
            index % 2 === 0 ? 'symbol__info_bg_even' : 'symbol__info_bg_odd'
          }`}
        >
          <div className='symbol__image'>
            <img
              src={iconUrl}
              alt="coin avatar"
              onError={({ currentTarget }) => {
                setIconUrl(BtcImg)
              }}
            />
          </div>
          <div className='coin_symbol_info'>
            <p>{Coin?.symbol}</p>
            <p>{coin.name}</p>
          </div>
          <div className='coin_symbol_type'>
            <p>type</p>
            <p>Spot</p>
          </div>
          <div className='coin_symbol_price'>
            <p>Price</p>
            <p>{Coin?.last_price}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EachSymbol;
