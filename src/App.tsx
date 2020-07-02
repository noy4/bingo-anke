import React from 'react';
import './App.css';
import './App.sass';


interface SurveyState {
    playerName: string;
    playerSex: string;
    food: string;
}
class Survey extends React.Component<{}, SurveyState> { //@{}って何。いるのか
    constructor(props: {}) {
        super(props);
        this.state = { //stateは親に持たせて関数にすべきか
            playerName : '',
            playerSex : '',
            food : 'apple',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) { //@型指定がついたことでセレクトボックスの値が受け取れんなった
        const target = event.target;
        if (target != null){
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
        }
    }

    render() {
        const title = "タイプスクリプト版アンケート";

        return (
        <form>
            <div className="title box"><h1>{title}</h1></div>

            <div className="player-name box">
            <label htmlFor="playerName">
                名前：
                <input 
                name="playerName"
                type="text"
                value={this.state.playerName}
                onChange={this.handleInputChange} />
            </label>
            </div>
            <div className="player-sex box">
            <label>
                性別：
                <input
                name="playerSex"
                type="radio"
                value="male"
                checked={this.state.playerSex === 'male'}
                onChange={this.handleInputChange}
                className="player-sex-input"/>
                男性
            </label>
            <label>
                <input
                name="playerSex"
                type="radio"
                value="female"
                checked={this.state.playerSex === 'female'}
                onChange={this.handleInputChange}
                className="player-sex-input"/>
                女性
            </label>
            </div>
            
        </form>
        );
    }
}

const Ranking = () => {
    const rankers = [
        {rank: 1, name: '二宮', from: '愛媛大学', bingoNumber: 12, score: 488},
        {rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', bingoNumber: 7, score: 302},
        {rank: 2, name: '相葉', from: '九州大学', bingoNumber: 7, score: 302},
        {rank: 3, name: 'MJ', from: '大衆食堂しゃーき', bingoNumber: 6, score: 127},
        {rank: 4, name: '大野', from: '早稲田大学', bingoNumber: 5, score: 92},
    ];
      
    return (
        <div className="ranking">
            <div className="title">
                <h2>ランキング</h2>
            </div>
            <div className="rows">
            {rankers.map((ranker, index) => {
                return(
                <div className="row" key={index}>
                    <div className="rank">
                        <div className="round">{ranker.rank}</div>
                    </div>
                    <div className="info">
                        <div className="ranker hide-over">{ranker.name}（{ranker.from}）</div>
                    <div className="scores sub-row">
                        <div className="ranker-bingo-number">{ranker.bingoNumber} BINGO</div>
                        <div className="ranker-score">{ranker.score}</div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    );
};

export interface BingoProps {
    bingoCard: (number | string)[];
}
const Bingo: React.FC<BingoProps> = (props) => {
    const renderSquare = (i: number) => {
        return (<div className="square">{props.bingoCard[i]}</div>);
    };

    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

interface MenuProps {
    bingoCard: (number | string)[];
}
const Menu: React.FC<MenuProps> = (props) => {
    return (
        <footer>
        <div id="nav-drawer">
            <input id="nav-input" type="checkbox" className="nav-unshown" />
            <label id="nav-open" htmlFor="nav-input"><span></span></label>
            <label className="nav-unshown" id="nav-close" htmlFor="nav-input"></label>
            <div id="nav-content">
                <Ranking />
                <Bingo bingoCard={props.bingoCard}/>
            </div>
        </div>
        </footer>
    );
};

interface AppState {
    balls: number[];
    bingoCard: (number | string)[]
    numberOfBingo: number;
    modalIsActive: boolean;
}
class App extends React.Component<{}, AppState> {
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
        console.log(list);
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

export default App;
