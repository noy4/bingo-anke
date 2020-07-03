import React from 'react';
import Ranking from './Ranking';
import Bingo from './Bingo';

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

export default Menu;