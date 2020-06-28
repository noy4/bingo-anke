import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';


interface SurveyState {
  playerName: string;
  playerSex: string;
  food: string;
}

class Survey extends React.Component<{}, SurveyState> { //@{}って何。いるのか
  constructor() { //@propsはいらないのか
    super({}); //@テキトーに{}を入れたらエラー直った
    this.state = {
      playerName : '',
      playerSex : '',
      food : 'apple',
    };
    this.handleInputChange = this.handleInputChange.bind(this); //@いらん？
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) { //@セレクトボックスの値は受け取れん
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
      </div>
    );
  }
}

export default App;
