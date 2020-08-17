import React, { useState } from 'react';

const Survey = () => {
    const [posts, setPosts] = useState({
        playerName: '',
        playerSex: '',
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target != null){
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            setPosts(state => ({...state, [name]: value}));
        }
    }

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
                value={posts.playerName}
                onChange={handleInputChange} />
            </label>
            </div>
            <div className="player-sex box">
            <label>
                性別：
                <input
                name="playerSex"
                type="radio"
                value="male"
                checked={posts.playerSex === 'male'}
                onChange={handleInputChange}
                className="player-sex-input"/>
                男性
            </label>
            <label>
                <input
                name="playerSex"
                type="radio"
                value="female"
                checked={posts.playerSex === 'female'}
                onChange={handleInputChange}
                className="player-sex-input"/>
                女性
            </label>
            </div>
            
        </form>
    );
};

export default Survey;