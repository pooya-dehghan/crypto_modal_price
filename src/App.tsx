import PriceModal from './components/PriceModal/PriceModal';
import './App.css';
import { useState } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="container">
      {openModal ? <PriceModal /> : null}
      <button onClick={() => setOpenModal(true)}>click me</button>
    </div>
  );
}

export default App;
