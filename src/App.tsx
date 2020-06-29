import React from 'react';
import './App.css';
import './App.sass';


interface SurveyState {
    playerName: string;
    playerSex: string;
    food: string;
}
class Survey extends React.Component<{}, SurveyState> { //@{}って何。いるのか
    constructor() { //@propsはいらないのか、stateは親に持たせて関数にすべきか
        super({}); //@テキトーに{}を入れたらエラー直った
        this.state = {
        playerName : '',
        playerSex : '',
        food : 'apple',
        };
        this.handleInputChange = this.handleInputChange.bind(this); //@いらん？
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) { //@型指定がついたことでセレクトボックスの値が受け取れんなった
        const target = event.target;
        if (target != null){
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value}); //@...this.state何これ
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
        </div>
    );
}

const Board = () => {
    
}

const Menu = () => {
    return (
        <footer>
        <div id="nav-drawer">
            <input id="nav-input" type="checkbox" className="nav-unshown" />
            <label id="nav-open" htmlFor="nav-input"><span></span></label>
            <label className="nav-unshown" id="nav-close" htmlFor="nav-input"></label>
            <div id="nav-content">
            <Ranking />
            {/* <Board 
                squares={this.state.squares}
            /> */}
            <Bingo />
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
    render() {
        return (
        <div className="app">
            <Survey />
            <Menu />
        </div>
        );
    }
}

export default App;
