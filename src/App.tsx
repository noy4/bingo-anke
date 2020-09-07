import React, { useState, useEffect } from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import { Ranker } from './components/Ranking';//eslint-disable-line 
import Bingo from './components/Bingo';
import API, { graphqlOperation } from '@aws-amplify/api';
import { CreatePostInput, OnCreatePostSubscription } from './API';//eslint-disable-line
import { listPostsSortedByScore } from './graphql/queries';
import { onCreatePost } from './graphql/subscriptions';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, CssBaseline, Fab, Drawer,
    Grid, Avatar, Box, Modal, LinearProgress,
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
    progressBar: {
        position: 'fixed',
        width: '100vw',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    fab: {
        position: "fixed",
        bottom: 4,
        zIndex: 10,
    },
    slots: {
        height: '20vh',
        margin: '10vh 0 5vh',
    },
    slot1: {
        padding: theme.spacing(8),
        fontSize: '4em',
    },
    slot2: {
        padding: theme.spacing(6),
        margin: theme.spacing(1),
        fontSize: '3em',
    },
    slot3: {
        padding: theme.spacing(5),
        margin: theme.spacing(1),
        fontSize: '3em',
    },

}));

interface SubscriptionValue<T> {
    value: { data: T };
}

const App = () => {
    const classes = useStyles();

    const [progress, setProgress] = useState(0);
    const [drawer, setDrawer] = useState(false);
    const [modal, setModal] = useState(false);

    const [balls, setBalls] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [bingoCard, setBingoCard] = useState(makeBingoCard());
    const [numberOfBingo, setNumberOfBingo] = useState(0);
    const [score, setScore] = useState(0);

    const [slotValues, setSlotValues] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [numberOfSlot, setNumberOfSlot] = useState(1);


    const [rankers, setRankers] = useState<Ranker[]>([
        { rank: 1, name: '二宮', from: '愛媛大学', bingoNumber: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', bingoNumber: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', bingoNumber: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', bingoNumber: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', bingoNumber: 5, score: 92 },
        { rank: 1, name: '二宮', from: '愛媛大学', bingoNumber: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', bingoNumber: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', bingoNumber: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', bingoNumber: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', bingoNumber: 5, score: 92 },
    ]);


    function makeBingoCard() {
        const col_1 = makeColumn(1);
        const col_2 = makeColumn(4);
        const col_3 = makeColumn(7);
        const list = [...col_1, ...col_2, ...col_3];
        list[4] = {
            'value': 0,
            'isValid': true,
        };
        // console.log(list);
        return list;
    }
    function makeColumn(base: number) {
        const array = Array(3).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 3; i++) {
            const a: number = ~~(Math.random() * array.length);
            list.push({ 'value': array[a], 'isValid': false });
            array.splice(a, 1);
        }
        return list;
    }

    function slot(slotIndexes: number[]) {
        const a = ~~(Math.random() * balls.length);
        const updatedSlotValues: number[] = [];
        slotIndexes.forEach(slotIndex => {
            updatedSlotValues[slotIndex] = balls[a];
        });
        setSlotValues(state => ({...state, ...updatedSlotValues}));
    }

    async function galapon(numberOfSlot: number = 1) {
        setNumberOfSlot(numberOfSlot);
        setModal(true);
        const updatedBingoCard = bingoCard.slice();
        const updatedBalls = balls.slice();
        const slotIndexes = Array(numberOfSlot).fill(0).map((_, i) => i);
        const drawnBalls: number[] = [];

        const interval = setInterval(() => slot(slotIndexes), 50);

        for (let i = 0; i < numberOfSlot; i++) {
            await sleep(500);
            const a = ~~(Math.random() * updatedBalls.length);
            const ball = updatedBalls[a];
            slotIndexes.splice(0, 1);
            updatedBalls.splice(a, 1);
            drawnBalls.push(ball);
            setSlotValues(state => ({...state, [i]: ball}));
        }
        clearInterval(interval);

        await sleep(500);
        for (let i = 0; i < numberOfSlot; i++) {
            const foundIndex = updatedBingoCard.findIndex(number => number.value === drawnBalls[i]);
            if (foundIndex !== -1) {
                await sleep(500);
                updatedBingoCard[foundIndex].isValid = true;
                setScore(score + drawnBalls[i]);
                setBingoCard(updatedBingoCard);
            }
        }

        setBalls(updatedBalls);
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

    function calculateScrollRate() {
        const innerHeight = window.innerHeight;
        const element = document.getElementById('root') || new HTMLHtmlElement();
        const rect = element?.getBoundingClientRect();
        const elementHeight = rect?.height;
        const scrollMax = elementHeight - innerHeight;
        const scrollY = window.pageYOffset;
        const scrollRate = ~~(scrollY / scrollMax * 100);
        setProgress(scrollRate);
    }

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByScore, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken,
        }));
        const newRankers = res.data.listPostsSortedByScore.items.map((post: CreatePostInput) => (
            {
                rank: 0,
                name: post.displayName,
                from: post.playerFrom,
                bingoNumber: post.numberOfBingo,
                score: post.score
            }
        ));
        // setRankers(state => ([...newRankers, ...state]));
        setRankers(newRankers);
    };

    useEffect(() => {
        getPosts();
        document.addEventListener('scroll', calculateScrollRate);
        
        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (msg: SubscriptionValue<OnCreatePostSubscription>) => {
                if (msg.value.data.onCreatePost) {
                    getPosts();
                    console.log('subscription fired');
                }
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const Slots = () => {
        const slots = [];
        for (let i = 0; i < numberOfSlot; i++) {
            slots.push(
                <Avatar className={eval('classes.slot' + numberOfSlot)} key={i}>
                    <Box component="h1">{slotValues[i]}</Box>
                </Avatar>
            );
        }

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                className={classes.slots}>
                    
                {slots}
            </Grid>
        );
    };

    return (
        <Container className={classes.root} maxWidth="xs">
            <CssBaseline />
            <LinearProgress variant='determinate' value={progress} className={classes.progressBar} />
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
                <Menu rankers={rankers} bingoCard={bingoCard} />
            </Drawer>

            <Survey
                galapon={galapon}
                numberOfBingo={numberOfBingo}
                score={score}
            />
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
                    <Slots />
                    <Bingo bingoCard={bingoCard} />
                </Grid>
            </Modal>
        </Container>
    );
};

export default App;
