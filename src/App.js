import React, { useEffect, useRef, useState } from "react";
import './App.css';
import chen from './images/chen.png'
import reimu from './images/reimu.png'
import marisa from './images/marisa.png'


const imgs = [
  chen,
  reimu,
  marisa
];

const chooseRandomIdx = (arr) => Math.floor(Math.random() * imgs.length)


const Slots = () => {
  const [isActive, setIsActive] = useState(false);
  const [rollCounter, setRollCounter] = useState(0)

  const RollBtn = () =>  <div>
    <button
    className='roll-btn'
    onClick={() => {
      setIsActive(true)
      setRollCounter((old) => old+1)
    }}
    disabled={isActive}
  >
    Roll
  </button>
  </div>

  return <div className="slots">
    <div className="meta">
      <div className="roll-counter">
        <span>Rolls: {rollCounter}</span>
      </div>
      <RollBtn />
    </div>
    <div className='slot-container' onClick={() => setIsActive(false)}>
      <Slot isActive={isActive}></Slot>
      <Slot isActive={isActive}></Slot>
      <Slot isActive={isActive}></Slot>
      <Slot isActive={isActive}></Slot>
    </div>
  </div>
}

const Slot = ({ isActive }) => {

  const [imageIdx, setImageIdx] = useState(0);
  const timerRef = useRef()

  useEffect(() => {
    if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isActive) {
      timerRef.current = setInterval(() => {
        let randomIdx = imageIdx
        while (randomIdx === imageIdx) {
          randomIdx = chooseRandomIdx(imgs)
        }
        setImageIdx(randomIdx)

        clearInterval(timerRef.current)
      }, 150);
      return () => clearInterval(timerRef.current);
    }
  }, [isActive, timerRef, imageIdx])

  return (
    <div>
      <img src={imgs[imageIdx]} alt="slot" width={160} height={160} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Slots></Slots>
    </div>
  );
}

export default App;
