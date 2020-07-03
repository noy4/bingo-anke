import React from 'react';

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

export default Ranking;
