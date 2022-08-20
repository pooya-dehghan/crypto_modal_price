import { Icoin } from "./PriceModal.types";

export interface IProps {
    coin: Icoin;
    index: number;
  }
  
export  interface ICoinServer {
    symbol: string;
    timestamp: number;
    last_price: string;
  }
  