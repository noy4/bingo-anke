import React from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import Bingo from './components/Bingo';
import './App.sass';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile);


interface AppState {
    balls: number[];
    bingoCard: (number | string)[]
    numberOfBingo: number;
    modalIsActive: boolean;
}
class App2 extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            balls: Array(9).fill(0).map((_, i) => i + 1),
            bingoCard: this.makeBingoCard(),
            numberOfBingo: 0,
            modalIsActive: false
        };
    }
  
    closeModal() {
      this.setState({modalIsActive: false});
    }

    makeBingoCard() {
        const col_1 = this.makeColumn(1);
        const col_2 = this.makeColumn(4);
        const col_3 = this.makeColumn(7);
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
    makeColumn(base: number) {
        const array = Array(3).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 3; i++) {
            const a: number = Math.floor(Math.random() * array.length);
            list.push(array[a]);
            array.splice(a, 1);
        }
        return list;
    }

    galapon() {
        const bingoCard = this.state.bingoCard.slice();
        
        const a = Math.floor(Math.random() * this.state.balls.length);
        const ball = this.state.balls[a];
        this.state.balls.splice(a, 1);
        const foundIndex = this.state.bingoCard.findIndex(number => number === ball);
        bingoCard[foundIndex] = '@';
        
        this.setState({
            bingoCard: bingoCard, 
            numberOfBingo: this.checkBingo(bingoCard),
            modalIsActive: true
        });
    }

    checkBingo(bingoCard: (number | string)[]) {
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

    render() {
        let className = 'modal';
        if (this.state.modalIsActive) {
          className += ' active';
        }
        
        return (
        <div className="app">
            <Survey />
            <div className={className} onClick={() => this.closeModal()}>
                <Bingo 
                    bingoCard={this.state.bingoCard}
                />
            </div>
            <button onClick={() => this.galapon()}>ガラポンを回す</button>
            <div>ビンゴ数：{this.state.numberOfBingo}</div>

            <Menu bingoCard={this.state.bingoCard} />
        </div>
        );
    }
}

export default App2;
