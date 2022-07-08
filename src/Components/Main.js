import "../Stylesheets/main.css";
import Button from "./Button";
import Die from "./Die";
import { useState, useEffect } from "react";

export default function Main({}) {
  const [refNumber, setRefNumber] = useState(0);

  const [stateButton, setStateButton] = useState(true);

  const [gameState, setGameState] = useState(true);

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    let arrayNums = [];
    for (let i = 0; i < 10; i++) {
      arrayNums.push({ id: i, number: randomNumbers(), classMode: false });
    }
    setNumbers(arrayNums);
  }, []);

  useEffect(() => {
    if (refNumber !== 0) {
      const result = numbers.filter(
        (num) => num.number === refNumber && num.classMode === false
      );

      if (result.length === 0) {
        setStateButton(true);
      }

      if (numbers.filter((n) => n.classMode === false).length === 0) {
        setGameState(!gameState);
        setRefNumber(0);
      }
    }
  }, [numbers]);

  /**
   * Function that starts game. It generates random number to start setting ref number State and Game State. But if
   * player doesn't have numbers to match it generates news only on dies with classmode === false
   */
  const numbeRand = () => {
    if (refNumber === 0) {
      let numRef = randomNumbers();

      while (numbers.filter((n) => n.number === numRef).length === 0) {
        numRef = randomNumbers();
      }

      setRefNumber(numRef);
      setStateButton((currentState) => !currentState);
    } else {
      setNumbers((num) =>
        num.map((n) => {
          return n.classMode === false ? { ...n, number: randomNumbers() } : n;
        })
      );
    }
  };

  /**
   *
   * @returns A random number between a range (1 to 6)
   */
  const randomNumbers = () => {
    return Math.floor(Math.random() * (6 - 1) + 1);
  };

  const resetGame = () => {
    let arrayNums = [];
    for (let i = 0; i < 10; i++) {
      arrayNums.push({ id: i, number: randomNumbers(), classMode: false });
    }
    setNumbers(arrayNums);
    setGameState(true);
  };

  const handleClickDie = (e, id) => {
    if (parseInt(e.target.textContent) === refNumber) {
      setNumbers((num) =>
        num.map((n) => {
          return n.id === id ? { ...n, classMode: true } : n;
        })
      );
    }
  };

  const dies = numbers.map((num, idx) => (
    <Die
      key={idx}
      id={idx}
      number={num.number}
      numberRef={refNumber}
      classMode={num.classMode}
      handleClick={handleClickDie}
    />
  ));

  return (
    <main className="main-game">
      {!gameState && <div className="title--game">Game Over</div>}
      {gameState && refNumber ===0 && (<div className="present--game">Welcome to my Game. You need to match generated big number with above dies.<br/>If you need new numbers press play button</div>)}
      {refNumber !== 0 && <div className="scopenumber--game">{refNumber}</div>}
      <div className="numbers--game">{dies}</div>

      {gameState && (
        <Button activate={numbeRand} name="Play" state={stateButton} />
      )}

      {!gameState && <Button activate={resetGame} name="Reset" state={true} />}
    </main>
  );
}
