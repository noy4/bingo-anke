import React, { useState } from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import Bingo from './components/Bingo';
import './App.sass';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, CssBaseline, Fab, Drawer,
    Grid, Avatar, Box, Modal,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile);

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#bbdefb",
        padding: theme.spacing(2),
    },
    fab: {
        position: "fixed",
        bottom: 4,
    },
    slot: {
        padding: theme.spacing(8),
        margin: theme.spacing(5),
    }

}));

const App = () => {
    const classes = useStyles();

    const [drawer, setDrawer] = useState(false);
    const [modal, setModal] = useState(false);

    const [balls, setBalls] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [bingoCard, setBingoCard] = useState(makeBingoCard());
    const [numberOfBingo, setNumberOfBingo] = useState(0);
    const [slotValue, setSlotValue] = useState(9);
    const [score, setScore] = useState(0);


    function makeBingoCard() {
        const col_1 = makeColumn(1);
        const col_2 = makeColumn(4);
        const col_3 = makeColumn(7);
        const list = [...col_1, ...col_2, ...col_3];
        list[4].value = 0;
        // console.log(list);
        return list;
    }
    function makeColumn(base: number) {
        const array = Array(3).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 3; i++) {
            const a: number = ~~(Math.random() * array.length);
            list.push({'value': array[a], 'isValid': false});
            array.splice(a, 1);
        }
        return list;
    }

    function slot() {
        const a = ~~(Math.random() * balls.length);
        setSlotValue(balls[a]);
    }

    async function galapon() {
        setModal(true);
        const interval = setInterval(() => slot(), 50);
        await sleep(1000);
        clearInterval(interval);

        const updatedBingoCard = bingoCard.slice();
        const updatedBalls = balls.slice();

        const a = Math.floor(Math.random() * balls.length);
        const ball = balls[a];
        setSlotValue(ball);
        await sleep(1000);

        updatedBalls.splice(a, 1);
        const foundIndex = updatedBingoCard.findIndex(number => number.value === ball);
        if (foundIndex !== -1) {
            updatedBingoCard[foundIndex].isValid = true;
            setScore(score + ball);
        }

        setBalls(updatedBalls);
        setBingoCard(updatedBingoCard);
        setNumberOfBingo(checkBingo());
    }

    function sleep(waitSec: number) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(); }, waitSec);
        });
    }

    function checkBingo() {
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
            if (bingoCard[a].isValid && bingoCard[b].isValid && bingoCard[c].isValid) {
                counter++;
            }
        }
        return counter;
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <CssBaseline />
            <Fab
                className={classes.fab}
                onClick={() => setDrawer(true)}
            >
                <MenuIcon />
            </Fab>

            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <Menu bingoCard={bingoCard} />
            </Drawer>

            <Survey galapon={galapon} />
            <ul>
                <li>numberOfBingo: {numberOfBingo}</li>
                <li>score: {score}</li>
            </ul>
            
            <Modal
                open={modal}
                disableAutoFocus
                disableEnforceFocus
                onClose={() => setModal(false)}
            >
                <Grid container direction="column" alignItems="center">
                    <Box height="5vh"></Box>
                    <Avatar className={classes.slot}>
                        <Box component="h1" fontWeight="bold" fontSize="5em">{slotValue}</Box>
                    </Avatar>
                    <Bingo bingoCard={bingoCard} />
                </Grid>
            </Modal>
        </Container>
    );
};

export default App;
