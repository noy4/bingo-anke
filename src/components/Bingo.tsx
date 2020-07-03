import React from 'react';

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

export default Bingo;