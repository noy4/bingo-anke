import React, { useState } from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import Bingo from './components/Bingo';
import './App.sass';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile);

const App = () => {
    const [balls, setBalls] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [bingoCard, setBingoCard] = useState(makeBingoCard());
    const [numberOfBingo, setNumberOfBingo] = useState(0);
    const [modalIsActive, setModalIsActive] = useState(false);  
  
    function closeModal() {
      setModalIsActive(false);
    }

    function makeBingoCard() {
        const col_1 = makeColumn(1);
        const col_2 = makeColumn(4);
        const col_3 = makeColumn(7);
        const list: Array<number | string> = new Array(9);
        for (let i: number = 0; i < 3; i++) {
            list[i * 3 + 0] = col_1[i];
            list[i * 3 + 1] = col_2[i];
            list[i * 3 + 2] = col_3[i];
        }
        list[4] = '@';
        // console.log(list);
        return list;
    }
    function makeColumn(base: number) {
        const array = Array(3).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 3; i++) {
            const a: number = Math.floor(Math.random() * array.length);
            list.push(array[a]);
            array.splice(a, 1);
        }
        return list;
    }

    function galapon() {
        const updatedBingoCard = bingoCard.slice();
        const updatedBalls = balls.slice();

        const a = Math.floor(Math.random() * balls.length);
        const ball = balls[a];
        updatedBalls.splice(a, 1);
        const foundIndex = updatedBingoCard.findIndex(number => number === ball);
        updatedBingoCard[foundIndex] = '@';
        
        setBalls(updatedBalls);
        setBingoCard(updatedBingoCard);
        setNumberOfBingo(checkBingo(bingoCard));
        setModalIsActive(true);
    }

    function checkBingo(bingoCard: (number | string)[]) {
        let counter = 0;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (bingoCard[a] === '@' && bingoCard[b] === '@' && bingoCard[c] === '@') {
                counter++;
            }
        }
        return counter;
    }

    let className = 'modal';
    if (modalIsActive) {
        className += ' active';
    }
    
    return (
    <div className="app">
        <Survey />
        <div className={className} onClick={() => closeModal()}>
            <Bingo 
                bingoCard={bingoCard}
            />
        </div>
        <button onClick={() => galapon()}>ガラポンを回す</button>
        <div>ビンゴ数：{numberOfBingo}</div>

        <Menu bingoCard={bingoCard} />
    </div>
    );
};

export default App;
